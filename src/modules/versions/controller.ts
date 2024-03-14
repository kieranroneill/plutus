import { Controller, Get } from '@nestjs/common';

// enums
import { APIPathEnum } from '@app/enums';

// services
import Service from './service';

// types
import type { IVersionsResponseBody } from './types';

@Controller(APIPathEnum.Versions)
export default class VersionsController {
  constructor(private readonly service: Service) {}

  @Get()
  public async get(): Promise<IVersionsResponseBody> {
    return this.service.get();
  }
}
