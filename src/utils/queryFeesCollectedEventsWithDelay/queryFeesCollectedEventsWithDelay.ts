import {
  Contract,
  DeferredTopicFilter,
  EventLog,
  JsonRpcProvider,
  Log,
} from 'ethers';

// types
import type { IFeesCollectedEvent } from '@app/types';
import type { IOptions } from './types';

// utils
import createFeesCollectedContract from '@app/utils/createFeesCollectedContract';
import mapEthersEventLogToFeesCollectedEvent from '@app/utils/mapEthersEventLogToFeesCollectedEvent';

/**
 * Convenience function that queries the historic fees collected events from the provided chain.
 * @param {IOptions} options - options including the chain config, the starting block and the ending block. If no ending
 * block is defined, the first 100 events from the starting block are used.
 * @returns {Promise<IFeesCollectedEvent[]>} a promise containing the events between the provided blocks for a given chain.
 */
export default async function queryFeesCollectedEventsWithDelay({
  chainConfig,
  delay = 0,
  fromBlockNumber,
  toBlockNumber,
}: IOptions): Promise<IFeesCollectedEvent[]> {
  return new Promise<IFeesCollectedEvent[]>((resolve) =>
    setTimeout(async () => {
      const contract: Contract = createFeesCollectedContract({
        contractAddress: chainConfig.feesCollectedContract.contractAddress,
        provider: new JsonRpcProvider(chainConfig.rpcURL),
      });
      const filter: DeferredTopicFilter = contract.filters.FeesCollected();
      const events: (EventLog | Log)[] = await contract.queryFilter(
        filter,
        fromBlockNumber,
        toBlockNumber || fromBlockNumber + BigInt(100)
      );

      resolve(
        events.map<IFeesCollectedEvent>((event) =>
          mapEthersEventLogToFeesCollectedEvent({
            contract,
            event,
          })
        )
      );
    }, delay)
  );
}
