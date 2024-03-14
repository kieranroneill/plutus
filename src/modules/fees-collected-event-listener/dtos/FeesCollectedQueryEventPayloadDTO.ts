interface IProps {
  chainId: string;
}

export default class FeesCollectedQueryEventPayloadDTO {
  public readonly chainId: string;

  constructor({ chainId }: IProps) {
    this.chainId = chainId;
  }
}
