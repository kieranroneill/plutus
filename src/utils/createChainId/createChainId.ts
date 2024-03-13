// types
import type { IChainConfig } from '@app/types';

/**
 * Convenience function that simply creates the chain ID as specified in CAIP-2.
 * @param {IChainConfig} chainConfig - the chain config to create the chain ID from.
 * @returns {string} the chain ID for the given chain.
 * @see {@link https://chainagnostic.org/CAIPs/caip-2}
 */
export default function createChainId(chainConfig: IChainConfig): string {
  return `${chainConfig.namespace}:${chainConfig.reference}`;
}
