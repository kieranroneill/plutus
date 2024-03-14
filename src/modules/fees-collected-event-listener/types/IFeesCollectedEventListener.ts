import type { EventLog, Log } from 'ethers';

interface IContractEventListener {
  chainId: string;
  listener: (
    token: string,
    integrator: string,
    integratorFee: bigint,
    lifiFee: bigint,
    event: EventLog | Log
  ) => void;
}

export default IContractEventListener;
