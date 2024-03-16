// types
import type { IFeeDocument } from '@app/types';

interface IFindByPageAggregateResult {
  data: IFeeDocument[];
  metadata: Record<'total', number>;
}

export default IFindByPageAggregateResult;
