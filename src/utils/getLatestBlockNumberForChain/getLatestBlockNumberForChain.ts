import { JsonRpcProvider } from 'ethers';

// types
import type { IChainConfig } from '@app/types';

/**
 * Convenience function that gets the latest block number for a given chain.
 * @param {IChainConfig} chainConfig - the chain configuration.
 * @returns {Promise<bigint>} a promise that resolves to the latest block number.
 */
export default async function getLatestBlockNumberForChain(
  chainConfig: IChainConfig
): Promise<bigint> {
  const provider: JsonRpcProvider = new JsonRpcProvider(chainConfig.rpcURL);
  const blockNumber: number = await provider.getBlockNumber();

  return BigInt(blockNumber);
}
