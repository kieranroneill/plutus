import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, Agent } from 'supertest';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// dtos
import { GetFeesResponseBodyDTO } from './dtos';

// enums
import { APIPathEnum } from '@app/enums';

// helpers
import seedDatabase from '../../../test/helpers/seedDatabase';

describe(`/${APIPathEnum.Fees}`, () => {
  const integrator: string = '0xBB59e1AD8607F2131A9cA41673150303a2641259';
  let agent: Agent;

  beforeAll(async () => {
    agent = request(`http://127.0.0.1:${process.env.APP_PORT}`);
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  describe(`GET /${APIPathEnum.Fees}`, () => {
    it('should return empty values for an unknown integrator', async () => {
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/unknown`)
        .expect(HttpStatus.OK);

      expect((response.body as GetFeesResponseBodyDTO).data).toHaveLength(0);
      expect((response.body as GetFeesResponseBodyDTO).nextPageURL).toBeNull();
      expect((response.body as GetFeesResponseBodyDTO).total).toBe(0);
    });

    it('should return the first 25 entries without any pagination', async () => {
      // arrange
      // act
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/${integrator}`)
        .expect(HttpStatus.OK);
      // assert
      const nextPageURL: URL = new URL(
        (response.body as GetFeesResponseBodyDTO).nextPageURL
      );

      expect((response.body as GetFeesResponseBodyDTO).data).toHaveLength(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect((response.body as GetFeesResponseBodyDTO).limit).toBe(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect(nextPageURL.searchParams.get('limit')).toBe(
        FEE_PAGINATION_MAX_LIMIT.toString()
      );
      expect(nextPageURL.searchParams.get('page')).toBe('2');
      expect((response.body as GetFeesResponseBodyDTO).page).toBe(1);
    });

    it('should return the page entries and the max limit if the limit is out of bounds', async () => {
      // arrange
      const page: number = 1;
      // act
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/${integrator}?page=${page}&limit=255`)
        .expect(HttpStatus.OK);
      // assert
      const nextPageURL: URL = new URL(
        (response.body as GetFeesResponseBodyDTO).nextPageURL
      );

      expect((response.body as GetFeesResponseBodyDTO).data).toHaveLength(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect((response.body as GetFeesResponseBodyDTO).limit).toBe(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect(nextPageURL.searchParams.get('limit')).toBe(
        FEE_PAGINATION_MAX_LIMIT.toString()
      );
      expect(nextPageURL.searchParams.get('page')).toBe((page + 1).toString());
      expect((response.body as GetFeesResponseBodyDTO).page).toBe(page);
    });

    it('should return the second page using pagination but without a limit', async () => {
      // arrange
      const page: number = 2;
      // act
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/${integrator}?page=${page}`)
        .expect(HttpStatus.OK);
      // assert
      const nextPageURL: URL = new URL(
        (response.body as GetFeesResponseBodyDTO).nextPageURL
      );

      expect((response.body as GetFeesResponseBodyDTO).data).toHaveLength(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect((response.body as GetFeesResponseBodyDTO).limit).toBe(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect(nextPageURL.searchParams.get('limit')).toBe(
        FEE_PAGINATION_MAX_LIMIT.toString()
      );
      expect(nextPageURL.searchParams.get('page')).toBe((page + 1).toString());
      expect((response.body as GetFeesResponseBodyDTO).page).toBe(page);
    });
  });
});
