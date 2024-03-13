import type { LogDescription } from 'ethers';

// types
import type { IFeesCollectedEvent } from '@app/types';
import type { IOptions } from './types';

export default function mapEthersEventLogToFeesCollectedEvent({
  contract,
  event,
}: IOptions): IFeesCollectedEvent {
  const log: LogDescription = contract.interface.parseLog(event);
  const [token, integrator, integratorFee, lifiFee] = log.args;

  return {
    blockNumber: BigInt(event.blockNumber),
    integrator,
    integratorFee,
    lifiFee,
    token,
  };
}
