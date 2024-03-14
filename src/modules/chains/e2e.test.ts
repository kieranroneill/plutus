import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, Agent } from 'supertest';

// configs
import { chains } from '@app/configs';

// enums
import { APIPathEnum } from '@app/enums';

// utils
import mapChainConfigToChainResponseBody from '@app/utils/mapChainConfigToChainResponseBody';

describe(`/${APIPathEnum.Chains}`, () => {
  let agent: Agent;

  beforeAll(async () => {
    agent = request(`http://127.0.0.1:3000`);
  });

  describe(`GET /${APIPathEnum.Chains}`, () => {
    it('should return the chain configuration', async () => {
      const response: Response = await agent
        .get(`/${APIPathEnum.Chains}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual(
        chains.map(mapChainConfigToChainResponseBody)
      );
    });
  });
});
