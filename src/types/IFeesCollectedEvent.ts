interface IFeesCollectedEvent {
  integrator: string;
  integratorFee: bigint;
  lifiFee: bigint;
  token: string;
}

export default IFeesCollectedEvent;
