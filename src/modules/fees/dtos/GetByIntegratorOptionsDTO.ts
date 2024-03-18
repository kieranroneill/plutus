interface IProps {
  integrator: string;
  limit: number;
  page: number;
}

export default class GetByIntegratorOptionsDTO {
  public readonly integrator: string;
  public readonly limit: number;
  public readonly page: number;

  constructor({ integrator, limit, page }: IProps) {
    this.integrator = integrator;
    this.limit = limit;
    this.page = page;
  }
}
