// types
import type { IFeeDocument } from '@app/types';

interface IFindByPageResult {
  data: IFeeDocument[];
  limit: number;
  page: number;
  total: number;
}

export default IFindByPageResult;
