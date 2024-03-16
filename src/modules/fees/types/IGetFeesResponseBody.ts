// types
import type { IFeeDocument } from '@app/types';

interface IGetFeesResponseBody {
  data: IFeeDocument[];
  limit: number;
  nextPageURL: string;
  page: number;
  total: number;
}

export default IGetFeesResponseBody;
