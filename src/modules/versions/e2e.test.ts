import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, Agent } from 'supertest';

// enums
import { APIPathEnum } from '@app/enums';

describe(`/${APIPathEnum.Versions}`, () => {
  let agent: Agent;

  beforeAll(async () => {
    agent = request(`http://127.0.0.1:3000`);
  });

  describe(`GET /${APIPathEnum.Versions}`, () => {
    it('should get the api info', async () => {
      const response: Response = await agent
        .get(`/${APIPathEnum.Versions}`)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchSnapshot();
    });
  });
});
