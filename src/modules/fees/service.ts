import { Injectable } from '@nestjs/common';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// dtos
import { FindByIntegratorAndPageResultDTO } from '@app/modules/fee-repository';
import { GetByIntegratorOptionsDTO } from './dtos';

// providers
import { FeeRepositoryService } from '@app/modules/fee-repository';

@Injectable()
export default class FeesService {
  constructor(private readonly feeRepositoryService: FeeRepositoryService) {}

  public async getByIntegrator({
    integrator,
    limit,
    page,
  }: GetByIntegratorOptionsDTO): Promise<FindByIntegratorAndPageResultDTO> {
    return await this.feeRepositoryService.findByIntegratorAndPage({
      integrator,
      limit:
        limit >= 0 && limit <= FEE_PAGINATION_MAX_LIMIT
          ? limit
          : FEE_PAGINATION_MAX_LIMIT, // if the limit is out of bounds, use the max limit
      page,
    });
  }
}
