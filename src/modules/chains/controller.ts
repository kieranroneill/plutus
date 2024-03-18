import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

// configs
import { chains } from '@app/configs';

// dtos
import { GetChainsResponseBodyDTO } from './dtos';

// enums
import { APIPathEnum } from '@app/enums';

// utils
import mapChainConfigToChainResponseBody from '@app/utils/mapChainConfigToChainResponseBody';

@Controller(APIPathEnum.Chains)
export default class ChainsController {
  @Get()
  @ApiOkResponse({
    description: 'Gets the list of the available chains.',
    type: [GetChainsResponseBodyDTO],
  })
  public async get(): Promise<GetChainsResponseBodyDTO[]> {
    return chains.map(mapChainConfigToChainResponseBody);
  }
}
