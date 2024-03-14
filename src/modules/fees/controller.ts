import { Controller, Get, Param } from '@nestjs/common';

// dtos
import { GetFeesParamsDTO } from './dtos';

// enums
import { APIPathEnum } from '@app/enums';

// services
import Service from './service';

// types
import type { IFeesResponseBody } from './types';

@Controller(APIPathEnum.Fees)
export default class FeesController {
  constructor(private readonly service: Service) {}

  @Get(':chainId')
  public async get(
    @Param() { chainId }: GetFeesParamsDTO
  ): Promise<IFeesResponseBody> {
    return this.service.get(chainId);
  }
}
