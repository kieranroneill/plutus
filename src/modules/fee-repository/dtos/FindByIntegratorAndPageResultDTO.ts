// types
import type { IFeeDocument } from '@app/types';

interface IProps {
  data: IFeeDocument[];
  limit: number;
  page: number;
  total: number;
}

export default class FindByIntegratorAndPageResultDTO {
  public readonly data: IFeeDocument[];
  public readonly limit: number;
  public readonly page: number;
  public readonly total: number;

  constructor({ data, limit, page, total }: IProps) {
    this.data = data;
    this.limit = limit;
    this.page = page;
    this.total = total;
  }
}
