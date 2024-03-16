import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

// configs
import { chains } from '@app/configs';

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
import type { IChainConfig } from '@app/types';
import type { IGetFeesResponseBody } from './types';

// utils
import createChainId from '@app/utils/createChainId';

@Controller(APIPathEnum.Fees)
export default class FeesController {
  constructor(private readonly service: Service) {}

  @Get(':chainId')
  public async getByChainId(
    @Param() { chainId }: GetFeesParamsDTO,
    @Query() query: GetFeesQueryDTO,
    @Req() req: Request
  ): Promise<IGetFeesResponseBody> {
    const chainConfig: IChainConfig | null =
      chains.find((value) => createChainId(value) === chainId) || null;
    let result: IFindByPageResult;

    if (!chainConfig) {
      throw new NotFoundException(`unknown chain "${chainId}"`);
    }

    result = await this.service.getByChainId({
      chainId,
      limit: query.limit ? parseInt(query.limit, 10) : FEE_PAGINATION_MAX_LIMIT,
      page: query.page ? parseInt(query.page, 10) : 1,
    });

    return {
      ...result,
      nextPageURL: `${req.protocol}://${req.get('host')}/${APIPathEnum.Fees}/${chainId}?limit=${result.limit}&page=${result.page + 1}`,
    };
  }
}
