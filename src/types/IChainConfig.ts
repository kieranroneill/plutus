// types
import type IFeesCollectedContractConfig from './IFeesCollectedContractConfig';

interface IChainConfig {
  canonicalName: string;
  feesCollectedContract: IFeesCollectedContractConfig;
  namespace: string;
  reference: string;
  rpcURL: string;
  testnet: boolean;
  websocketsURL: string;
}

export default IChainConfig;
