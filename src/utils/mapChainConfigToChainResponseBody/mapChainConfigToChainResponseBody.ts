// types
import type { IChainConfig, IChainResponseBody } from '@app/types';

// utils
import createChainId from '@app/utils/createChainId';

export default function mapChainConfigToChainResponseBody(
  chainConfig: IChainConfig
): IChainResponseBody {
  return {
    chainId: createChainId(chainConfig),
    canonicalName: chainConfig.canonicalName,
    namespace: chainConfig.namespace,
    reference: chainConfig.reference,
    testnet: chainConfig.testnet,
  };
}
