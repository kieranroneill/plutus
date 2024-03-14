import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, Agent } from 'supertest';

// enums
import { APIPathEnum } from '@app/enums';

// types
import type { IFeesResponseBody } from './types';

describe(`/${APIPathEnum.Fees}`, () => {
  let agent: Agent;

  beforeAll(async () => {
    agent = request(`http://127.0.0.1:3000`);
  });

  describe(`GET /${APIPathEnum.Fees}`, () => {
    it('should return empty values for an unknown chain', async () => {
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/unknown`)
        .expect(HttpStatus.OK);

      expect((response.body as IFeesResponseBody).total).toBe(0);
    });
  });
});
