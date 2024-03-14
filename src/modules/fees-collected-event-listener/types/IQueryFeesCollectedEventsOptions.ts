// types
import type { IChainConfig } from '@app/types';

interface IQueryFeesCollectedEventsOptions {
  chainConfig: IChainConfig;
  fromBlockNumber: bigint;
  toBlockNumber: bigint;
}

export default IQueryFeesCollectedEventsOptions;
