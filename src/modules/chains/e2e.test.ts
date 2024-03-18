import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, Agent } from 'supertest';

// configs
import { chains } from '@app/configs';

// enums
import { APIPathEnum } from '@app/enums';

// utils
import createAPIPathPrefix from '@app/utils/createAPIPathPrefix';
import mapChainConfigToChainResponseBody from '@app/utils/mapChainConfigToChainResponseBody';

describe(`/${APIPathEnum.Chains}`, () => {
  const path: string = `${createAPIPathPrefix(process.env.APP_VERSION)}/${APIPathEnum.Chains}`;
  let agent: Agent;

  beforeAll(async () => {
    agent = request(`http://127.0.0.1:${process.env.APP_PORT}`);
  });

  describe(`GET /${APIPathEnum.Chains}`, () => {
    it('should return the chain configuration', async () => {
      const response: Response = await agent
        .get(`/${path}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(
        chains.map(mapChainConfigToChainResponseBody)
      );
    });
  });
});
