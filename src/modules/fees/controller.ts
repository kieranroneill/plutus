import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import type { Request } from 'express';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// dtos
import { GetFeesParamsDTO, GetFeesQueryDTO } from './dtos';

// enums
import { APIPathEnum } from '@app/enums';

// services
import Service from './service';

// types
import type { IFindByPageResult } from '@app/modules/fee-repository';
import type { IGetFeesResponseBody } from './types';

@Controller(APIPathEnum.Fees)
export default class FeesController {
  constructor(private readonly service: Service) {}

  @Get(':chainId')
  public async getByChainId(
    @Param() { chainId }: GetFeesParamsDTO,
    @Query() query: GetFeesQueryDTO,
    @Req() req: Request
  ): Promise<IGetFeesResponseBody> {
    const { data, limit, page, total }: IFindByPageResult =
      await this.service.getByChainId({
        chainId,
        limit: query.limit
          ? parseInt(query.limit, 10)
          : FEE_PAGINATION_MAX_LIMIT,
        page: query.page ? parseInt(query.limit, 10) : 1,
      });

    return {
      data,
      limit,
      nextPageURL: `${req.protocol}://${req.get('host')}/${APIPathEnum.Fees}/${chainId}?limit=${limit}&page=${page + 1}`,
      page,
      total,
    };
  }
}
