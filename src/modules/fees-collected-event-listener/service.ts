import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Contract, EventLog, Log, WebSocketProvider } from 'ethers';

// configs
import { chains } from '@app/configs';

// constants
import {
  QUERY_EVENT_DELAY_IN_MILLISECONDS,
  QUERY_EVENT_MAX_LIMIT,
} from '@app/constants';

// dtos
import { CreateDTO as CreateFeeDTO } from '@app/modules/fee-repository';
import { FeesCollectedQueryEventPayloadDTO } from './dtos';

// enums
import { EventNameEnum } from '@app/enums';

// providers
import { FeeRepositoryService } from '@app/modules/fee-repository';

// types
import type {
  IChainConfig,
  IChainWebsocketProvider,
  IFeesCollectedEvent,
} from '@app/types';
import type {
  IAddFeesCollectedEventListenerOptions,
  IFeesCollectedEventListener,
  IQueryFeesCollectedEventsOptions,
} from './types';

// utils
import createChainId from '@app/utils/createChainId';
import createFeesCollectedContract from '@app/utils/createFeesCollectedContract';
import getLatestBlockNumberForChain from '@app/utils/getLatestBlockNumberForChain';
import queryFeesCollectedEventsWithDelay from '@app/utils/queryFeesCollectedEventsWithDelay';

@Injectable()
export default class FeeCollectdEventListenerService implements OnModuleInit {
  private feeCollectedEventListeners: IFeesCollectedEventListener[];
  private websocketProviders: IChainWebsocketProvider[];

  constructor(
    private readonly feeRepositoryService: FeeRepositoryService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {
    this.feeCollectedEventListeners = [];
    this.websocketProviders = [];
  }

  /**
   * private functions
   **/

  /**
   * Checks for a fees collected listener for a chain and adds it if it doesn't exist.
   * @param {IOptions} options - the chain configuration and a websocket provider.
   * @private
   */
  private async addFeesCollectedEventListener({
    chainConfig,
    provider,
  }: IAddFeesCollectedEventListenerOptions): Promise<void> {
    const _functionName: string = 'addFeesCollectedEventListener';
    const chainId: string = createChainId(chainConfig);
    let contract: Contract;
    let feeCollectedEventListener: IFeesCollectedEventListener | null =
      this.feeCollectedEventListeners.find(
        (value) => value.chainId === chainId
      ) || null;

    // if we already have a listener no need to add a new one
    if (feeCollectedEventListener) {
      return;
    }

    feeCollectedEventListener = {
      chainId,
      listener: async (
        token: string,
        integrator: string,
        integratorFee: bigint,
        lifiFee: bigint,
        event: EventLog | Log
      ) => {
        this.logger.debug(
          `${FeeCollectdEventListenerService.name}#${_functionName}: fees collected event emitted for chain "${chainConfig.canonicalName}" on block ${String(event.blockNumber)}`
        );

        await this.feeRepositoryService.create({
          blockNumber: String(event.blockNumber),
          chainId,
          integrator,
          integratorFee: String(integratorFee),
          lifiFee: String(lifiFee),
          token,
        });
      },
    };
    contract = createFeesCollectedContract({
      contractAddress: chainConfig.feesCollectedContract.contractAddress,
      provider,
    });

    // start listening to the event
    await contract.on('FeesCollected', feeCollectedEventListener.listener);

    this.feeCollectedEventListeners.push(feeCollectedEventListener);

    return;
  }

  private initializeWebsocketProvider(
    chainConfig: IChainConfig
  ): IChainWebsocketProvider | null {
    const _functionName: string = 'initializeWebsocketProvider';
    const chainId: string = createChainId(chainConfig);
    let websocketProvider: IChainWebsocketProvider | null =
      this.websocketProviders.find((value) => value.chainId === chainId) ||
      null;

    if (websocketProvider) {
      return websocketProvider;
    }

    try {
      websocketProvider = {
        chainId,
        provider: new WebSocketProvider(chainConfig.websocketsURL),
      };

      // add the provider
      this.websocketProviders.push(websocketProvider);

      return websocketProvider;
    } catch (error) {
      this.logger.error(
        `${FeeCollectdEventListenerService.name}#${_functionName}: `,
        error
      );

      return null;
    }
  }

  /**
   * Gets all the historical event data for the FeesCollected events. This function gets the starting point by the
   * last block number collected in the database or the genesis block from the chain config. The ending point is the
   * latest block in the chain. It then recursively gets the events between these two points, narrowing the block range
   * by 100 blocks. Any events that found are saved to the database.
   * @param {IQueryFeesCollectedEventsOptions} options - the chain configuration and the starting and ending block
   * numbers
   * @private
   */
  private async queryFeesCollectedEventsBetweenBlocks({
    chainConfig,
    fromBlockNumber,
    toBlockNumber,
  }: IQueryFeesCollectedEventsOptions): Promise<void> {
    const _functionName: string = 'queryFeesCollectedEventsBetweenBlocks';
    let chainId: string;
    let events: IFeesCollectedEvent[];
    let newFromBlockNumber: bigint;

    // we want to stop if the from block is greater than or equal to the to block
    if (fromBlockNumber >= toBlockNumber) {
      this.logger.debug(
        `${FeeCollectdEventListenerService.name}#${_functionName}: from block number ${String(fromBlockNumber)} is greater than or equal to the ${String(toBlockNumber)}, exiting`
      );

      return;
    }

    newFromBlockNumber = fromBlockNumber + BigInt(QUERY_EVENT_MAX_LIMIT);

    events = await queryFeesCollectedEventsWithDelay({
      chainConfig,
      delay: QUERY_EVENT_DELAY_IN_MILLISECONDS,
      fromBlockNumber: fromBlockNumber,
      logger: this.logger,
      toBlockNumber:
        toBlockNumber > newFromBlockNumber ? newFromBlockNumber : toBlockNumber,
    });

    // if we have found events, add them to the database
    if (events.length > 0) {
      this.logger.debug(
        `${FeeCollectdEventListenerService.name}#${_functionName}: found "${events.length}" events between block ${String(fromBlockNumber)} and block ${String(toBlockNumber > newFromBlockNumber ? newFromBlockNumber : toBlockNumber)}`
      );

      chainId = createChainId(chainConfig);

      await this.feeRepositoryService.bulkCreate(
        events.map(
          ({ blockNumber, integrator, integratorFee, lifiFee, token }) =>
            new CreateFeeDTO({
              blockNumber: String(blockNumber),
              chainId,
              integrator,
              integratorFee: String(integratorFee),
              lifiFee: String(lifiFee),
              token,
            })
        )
      );
    }

    return await this.queryFeesCollectedEventsBetweenBlocks({
      chainConfig,
      fromBlockNumber: newFromBlockNumber,
      toBlockNumber,
    });
  }

  /**
   * public functions
   **/

  @OnEvent(EventNameEnum.FeesCollectedEventQuery)
  public async handleFeesCollectedQueryEvent({
    chainId,
  }: FeesCollectedQueryEventPayloadDTO): Promise<void> {
    const _functionName: string = 'handleFeesCollectedQueryEvent';
    const chainConfig: IChainConfig | null =
      chains.find((value) => createChainId(value) === chainId) || null;
    let latestFeeBlockNumber: bigint | null;
    let latestBlockNumber: bigint;

    if (!chainConfig) {
      this.logger.debug(
        `${FeeCollectdEventListenerService.name}#${_functionName}: no chain config found for chain id "${chainId}", ignoring`
      );

      return;
    }

    latestFeeBlockNumber =
      await this.feeRepositoryService.findLatestBlockNumberForChainId(chainId);
    latestBlockNumber = await getLatestBlockNumberForChain(chainConfig);

    this.logger.debug(
      `${FeeCollectdEventListenerService.name}#${_functionName}: fetching fee collected events for chain "${chainConfig.canonicalName}", between block numbers ${String(latestFeeBlockNumber || chainConfig.feesCollectedContract.genesisBlockNumber)} and ${String(latestBlockNumber)}`
    );

    // recursively query the fee collected events and save them until the latest block number is hit
    return this.queryFeesCollectedEventsBetweenBlocks({
      chainConfig,
      fromBlockNumber:
        latestFeeBlockNumber ||
        chainConfig.feesCollectedContract.genesisBlockNumber,
      toBlockNumber: latestBlockNumber,
    });
  }

  public async onModuleInit(): Promise<void> {
    await Promise.all(
      chains.map(async (value) => {
        const websocketProvider: IChainWebsocketProvider | null =
          this.initializeWebsocketProvider(value);

        // TODO: implement a retry feature
        if (!websocketProvider) {
          return;
        }

        // start listening to fees collected events
        return await this.addFeesCollectedEventListener({
          chainConfig: value,
          provider: websocketProvider.provider,
        });
      })
    );
  }
}
