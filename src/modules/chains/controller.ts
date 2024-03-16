import { Controller, Get } from '@nestjs/common';

// configs
import { chains } from '@app/configs';

// enums
import { APIPathEnum } from '@app/enums';

// types
import type { IChainResponseBody } from '@app/types';

// utils
import mapChainConfigToChainResponseBody from '@app/utils/mapChainConfigToChainResponseBody';

@Controller(APIPathEnum.Chains)
export default class ChainsController {
  @Get()
  public async get(): Promise<IChainResponseBody[]> {
    return chains.map(mapChainConfigToChainResponseBody);
  }
}
