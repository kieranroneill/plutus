// dtos
import { GetChainsResponseBodyDTO } from '@app/modules/chains';

// types
import type { IChainConfig } from '@app/types';

// utils
import createChainId from '@app/utils/createChainId';

export default function mapChainConfigToChainResponseBody(
  chainConfig: IChainConfig
): GetChainsResponseBodyDTO {
  return new GetChainsResponseBodyDTO({
    chainId: createChainId(chainConfig),
    canonicalName: chainConfig.canonicalName,
    namespace: chainConfig.namespace,
    reference: chainConfig.reference,
    testnet: chainConfig.testnet,
  });
}
