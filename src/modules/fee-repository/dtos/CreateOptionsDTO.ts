interface IProps {
  blockNumber: string;
  chainId: string;
  integrator: string;
  integratorFee: string;
  lifiFee: string;
  token: string;
}

export default class CreateOptionsDTO {
  public readonly blockNumber: string;
  public readonly chainId: string;
  public readonly integrator: string;
  public readonly integratorFee: string;
  public readonly lifiFee: string;
  public readonly token: string;

  constructor({
    blockNumber,
    chainId,
    integrator,
    integratorFee,
    lifiFee,
    token,
  }: IProps) {
    this.blockNumber = blockNumber;
    this.chainId = chainId;
    this.integrator = integrator;
    this.integratorFee = integratorFee;
    this.lifiFee = lifiFee;
    this.token = token;
  }
}
