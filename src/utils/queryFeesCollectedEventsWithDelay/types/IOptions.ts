// types
import type { IBaseUtilityOptions, IChainConfig } from '@app/types';

interface IOptions extends IBaseUtilityOptions {
  chainConfig: IChainConfig;
  delay?: number;
  fromBlockNumber: bigint;
  toBlockNumber?: bigint;
}

export default IOptions;
