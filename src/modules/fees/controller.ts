import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import type { Request } from 'express';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// dtos
import { FindByIntegratorAndPageResultDTO } from '@app/modules/fee-repository';
import {
  GetByIntegratorOptionsDTO,
  GetFeesParamsDTO,
  GetFeesQueryDTO,
  GetFeesResponseBodyDTO,
} from './dtos';

// enums
import { APIPathEnum } from '@app/enums';

// services
import Service from './service';

@Controller(APIPathEnum.Fees)
export default class FeesController {
  constructor(private readonly service: Service) {}

  @Get(':integrator')
  @ApiOkResponse({
    description: 'Gets the fees collected for a given integrator.',
    type: GetFeesResponseBodyDTO,
  })
  public async getByIntegrator(
    @Param() { integrator }: GetFeesParamsDTO,
    @Query() query: GetFeesQueryDTO,
    @Req() req: Request
  ): Promise<GetFeesResponseBodyDTO> {
    const result: FindByIntegratorAndPageResultDTO =
      await this.service.getByIntegrator(
        new GetByIntegratorOptionsDTO({
          integrator,
          limit: query.limit
            ? parseInt(query.limit, 10)
            : FEE_PAGINATION_MAX_LIMIT,
          page: query.page ? parseInt(query.page, 10) : 1,
        })
      );

    return new GetFeesResponseBodyDTO({
      ...result,
      nextPageURL:
        result.total > 0
          ? `${req.protocol}://${req.get('host')}${req.originalUrl}?limit=${result.limit}&page=${result.page + 1}`
          : null,
    });
  }
}
