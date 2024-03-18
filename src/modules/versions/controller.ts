import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

// dtos
import { VersionResponseBodyDTO } from './dtos';

// enums
import { APIPathEnum } from '@app/enums';

// services
import Service from './service';

@Controller(APIPathEnum.Versions)
export default class VersionsController {
  constructor(private readonly service: Service) {}

  @Get()
  @ApiOkResponse({
    description: 'Gets information about the API.',
    type: VersionResponseBodyDTO,
  })
  public async get(): Promise<VersionResponseBodyDTO> {
    return this.service.get();
  }
}
