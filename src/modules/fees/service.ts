import { Injectable } from '@nestjs/common';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// providers
import { FeeRepositoryService } from '@app/modules/fee-repository';

// types
import type { IFindByPageResult } from '@app/modules/fee-repository';
import type { IGetByChainIdOptions } from './types';

@Injectable()
export default class FeesService {
  constructor(private readonly feeRepositoryService: FeeRepositoryService) {}

  public async getByChainId({
    chainId,
    limit,
    page,
  }: IGetByChainIdOptions): Promise<IFindByPageResult> {
    return await this.feeRepositoryService.findByPage({
      chainId,
      limit:
        limit >= 0 && limit <= FEE_PAGINATION_MAX_LIMIT
          ? limit
          : FEE_PAGINATION_MAX_LIMIT, // if the limit is out of bounds, use the max limit
      page,
    });
  }
}
