import { Injectable } from '@nestjs/common';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// dtos
import { FindByPageResultDTO } from '@app/modules/fee-repository';
import { GetByChainIdOptionsDTO } from './dtos';

// providers
import { FeeRepositoryService } from '@app/modules/fee-repository';

@Injectable()
export default class FeesService {
  constructor(private readonly feeRepositoryService: FeeRepositoryService) {}

  public async getByChainId({
    chainId,
    limit,
    page,
  }: GetByChainIdOptionsDTO): Promise<FindByPageResultDTO> {
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
