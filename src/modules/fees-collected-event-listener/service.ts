import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common';
import { JsonRpcProvider } from 'ethers';

// configs
import { chains } from '@app/configs';

// constants
import {
  QUERY_EVENT_MAX_LIMIT,
  QUERY_EVENT_TIMEOUT_IN_MILLISECONDS,
} from '@app/constants';

// providers
import { Service as FeeRepositoryService } from '@app/modules/fee-repository';

// types
import type { IChainConfig, IFeesCollectedEvent } from '@app/types';
import type { IQueryFeesCollectedEventsOptions } from './types';

// utils
import createChainId from '@app/utils/createChainId';
import queryFeesCollectedEventsWithDelay from '@app/utils/queryFeesCollectedEventsWithDelay';

@Injectable()
export default class FeeCollectdEventListenerService implements OnModuleInit {
  constructor(
    private readonly feeRepositoryService: FeeRepositoryService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  private async getLatestBlockNumber({
    rpcURL,
  }: IChainConfig): Promise<bigint> {
    const provider: JsonRpcProvider = new JsonRpcProvider(rpcURL);
    const blockNumber: number = await provider.getBlockNumber();

    return BigInt(blockNumber);
  }

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
        `${__filename}#${_functionName}: from block number ${String(fromBlockNumber)} is greater than or equal to the ${String(toBlockNumber)}, exiting`
      );

      return;
    }

    newFromBlockNumber = fromBlockNumber + BigInt(QUERY_EVENT_MAX_LIMIT);

    events = await queryFeesCollectedEventsWithDelay({
      chainConfig,
      delay: QUERY_EVENT_TIMEOUT_IN_MILLISECONDS,
      fromBlockNumber: fromBlockNumber,
      logger: this.logger,
      toBlockNumber:
        toBlockNumber > newFromBlockNumber ? newFromBlockNumber : toBlockNumber,
    });

    this.logger.debug(
      `${__filename}#${_functionName}: found "${events.length}" events between block ${String(fromBlockNumber)} and block ${String(toBlockNumber > newFromBlockNumber ? newFromBlockNumber : toBlockNumber)}`
    );

    chainId = createChainId(chainConfig);

    await this.feeRepositoryService.bulkCreate(
      events.map(
        ({ blockNumber, integrator, integratorFee, lifiFee, token }) => ({
          blockNumber: String(blockNumber),
          chainId,
          integrator,
          integratorFee: String(integratorFee),
          lifiFee: String(lifiFee),
          token,
        })
      )
    );

    return await this.queryFeesCollectedEventsBetweenBlocks({
      chainConfig,
      fromBlockNumber: newFromBlockNumber,
      toBlockNumber,
    });
  }

  public async onModuleInit(): Promise<void> {
    const _functionName: string = 'onModuleInit';

    await Promise.all(
      chains.map(async (chainConfig) => {
        const latestFeeBlockNumber: bigint | null =
          await this.feeRepositoryService.findLatestBlockNumber();
        const latestBlockNumber: bigint =
          await this.getLatestBlockNumber(chainConfig);

        this.logger.debug(
          `${__filename}#${_functionName}: fetching events between block ${String(latestFeeBlockNumber || chainConfig.feesCollectedContract.genesisBlockNumber)} and ${String(latestBlockNumber)}`
        );

        // recursively query the fee collected events and save them until the latest block number is hit
        return this.queryFeesCollectedEventsBetweenBlocks({
          chainConfig,
          fromBlockNumber:
            latestFeeBlockNumber ||
            chainConfig.feesCollectedContract.genesisBlockNumber,
          toBlockNumber: latestBlockNumber,
        });
      })
    );
  }
}
