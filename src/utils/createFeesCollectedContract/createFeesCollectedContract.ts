import { Contract } from 'ethers';

// abis
import feesCollectedContractABI from '@app/abis/fees_collected_contract_abi.json';

// types
import type { IOptions } from './types';

export default function createFeesCollectedContract({
  contractAddress,
  provider,
}: IOptions): Contract {
  return new Contract(contractAddress, feesCollectedContractABI, provider);
}
