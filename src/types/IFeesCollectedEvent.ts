interface IFeesCollectedEvent {
  blockNumber: bigint;
  integrator: string;
  integratorFee: bigint;
  lifiFee: bigint;
  token: string;
}

export default IFeesCollectedEvent;
