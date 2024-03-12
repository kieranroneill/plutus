import { Controller as NestController, Get } from '@nestjs/common';

// enums
import { APIPathEnum } from '@app/enums';

// services
import Service from './service';

// types
import type { IVersionsResponseBody } from './types';

@NestController(APIPathEnum.Versions)
export default class Controller {
  constructor(private readonly service: Service) {}

  @Get()
  public async get(): Promise<IVersionsResponseBody> {
    return this.service.get();
  }
}
