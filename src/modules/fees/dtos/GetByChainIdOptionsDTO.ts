interface IProps {
  chainId: string;
  limit: number;
  page: number;
}

export default class GetByChainIdOptionsDTO {
  public readonly chainId: string;
  public readonly limit: number;
  public readonly page: number;

  constructor({ chainId, limit, page }: IProps) {
    this.chainId = chainId;
    this.limit = limit;
    this.page = page;
  }
}
