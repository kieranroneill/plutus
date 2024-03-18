import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import { APIPathEnum, EnvironmentVariableKeyEnum } from '@app/enums';

// providers
import Service from './service';

// types
import type { IEnvironmentVariables } from '@app/types';

// utils
import createAPIPathPrefix from '@app/utils/createAPIPathPrefix';

@Controller(APIPathEnum.Fees)
export default class FeesController {
  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables, true>,
    private readonly service: Service
  ) {}

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
      // only show the next page url
      nextPageURL:
        result.total > 0 && result.page < Math.ceil(result.total / result.limit)
          ? `${req.protocol}://${req.get('host')}/${createAPIPathPrefix(this.configService.get<string>(EnvironmentVariableKeyEnum.AppVersion))}/${APIPathEnum.Fees}/${integrator}?limit=${result.limit}&page=${result.page + 1}`
          : null,
    });
  }
}
