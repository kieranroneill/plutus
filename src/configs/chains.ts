// types
import type { IChainConfig } from '@app/types';

const configs: IChainConfig[] = [
  {
    canonicalName: 'Polygon Mainnet',
    feesCollectedContract: {
      contractAddress: '0xbD6C7B0d2f68c2b7805d88388319cfB6EcB50eA9',
      genesisBlockNumber: BigInt(47961368),
    },
    namespace: 'eip155',
    reference: '137',
    rpcURL: 'https://polygon-rpc.com',
    testnet: false,
  },
];

export default configs;
