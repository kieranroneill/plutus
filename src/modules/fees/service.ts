import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

// providers
import { FeeRepositoryService } from '@app/modules/fee-repository';

// types
import type { IFeesResponseBody } from './types';

@Injectable()
export default class FeesService {
  constructor(
    private readonly feeRepositoryService: FeeRepositoryService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  public async get(chainId: string): Promise<IFeesResponseBody> {
    const total: number =
      await this.feeRepositoryService.countByChainId(chainId);

    return {
      total,
    };
  }
}
