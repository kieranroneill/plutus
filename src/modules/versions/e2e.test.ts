import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, Agent } from 'supertest';

// dtos
import { VersionResponseBodyDTO } from './dtos';

// enums
import { APIPathEnum } from '@app/enums';

// utils
import createAPIPathPrefix from '@app/utils/createAPIPathPrefix';

describe(`/${APIPathEnum.Versions}`, () => {
  const path: string = `${createAPIPathPrefix(process.env.APP_VERSION)}/${APIPathEnum.Versions}`;
  let agent: Agent;

  beforeAll(async () => {
    agent = request(`http://127.0.0.1:${process.env.APP_PORT}`);
  });

  describe(`GET /${APIPathEnum.Versions}`, () => {
    it('should get the api info', async () => {
      const response: Response = await agent
        .get(`/${path}`)
        .expect(HttpStatus.OK);

      expect((response.body as VersionResponseBodyDTO).name).toBe(
        process.env.APP_NAME
      );
      expect((response.body as VersionResponseBodyDTO).version).toBe(
        process.env.APP_VERSION
      );
    });
  });
});
