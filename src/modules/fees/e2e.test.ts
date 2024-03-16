import { HttpStatus } from '@nestjs/common';
import { agent as request, Response, Agent } from 'supertest';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// enums
import { APIPathEnum } from '@app/enums';

// helpers
import seedDatabase from '../../../test/helpers/seedDatabase';

// types
import type { IGetFeesResponseBody } from './types';

describe(`/${APIPathEnum.Fees}`, () => {
  const chainId: string = 'eip155:137';
  let agent: Agent;

  beforeAll(async () => {
    agent = request(`http://127.0.0.1:${process.env.APP_PORT}`);
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  describe(`GET /${APIPathEnum.Fees}`, () => {
    it('should return empty values for an unknown chain', async () => {
      await agent
        .get(`/${APIPathEnum.Fees}/unknown`)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should return the first 25 entries without any pagination', async () => {
      // arrange
      // act
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/${chainId}`)
        .expect(HttpStatus.OK);
      // assert
      const nextPageURL: URL = new URL(
        (response.body as IGetFeesResponseBody).nextPageURL
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect((response.body as IGetFeesResponseBody).data).toHaveLength(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect((response.body as IGetFeesResponseBody).limit).toBe(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect(nextPageURL.searchParams.get('limit')).toBe(
        FEE_PAGINATION_MAX_LIMIT.toString()
      );
      expect(nextPageURL.searchParams.get('page')).toBe('2');
      expect((response.body as IGetFeesResponseBody).page).toBe(1);
    });

    it('should return the page entries and the max limit if the limit is out of bounds', async () => {
      // arrange
      const page: number = 1;
      // act
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/${chainId}?page=${page}&limit=255`)
        .expect(HttpStatus.OK);
      // assert
      const nextPageURL: URL = new URL(
        (response.body as IGetFeesResponseBody).nextPageURL
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect((response.body as IGetFeesResponseBody).data).toHaveLength(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect((response.body as IGetFeesResponseBody).limit).toBe(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect(nextPageURL.searchParams.get('limit')).toBe(
        FEE_PAGINATION_MAX_LIMIT.toString()
      );
      expect(nextPageURL.searchParams.get('page')).toBe((page + 1).toString());
      expect((response.body as IGetFeesResponseBody).page).toBe(page);
    });

    it('should return the second page using pagination but without a limit', async () => {
      // arrange
      const page: number = 2;
      // act
      const response: Response = await agent
        .get(`/${APIPathEnum.Fees}/${chainId}?page=${page}`)
        .expect(HttpStatus.OK);
      // assert
      const nextPageURL: URL = new URL(
        (response.body as IGetFeesResponseBody).nextPageURL
      );

      expect(response.status).toBe(HttpStatus.OK);
      expect((response.body as IGetFeesResponseBody).data).toHaveLength(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect((response.body as IGetFeesResponseBody).limit).toBe(
        FEE_PAGINATION_MAX_LIMIT
      );
      expect(nextPageURL.searchParams.get('limit')).toBe(
        FEE_PAGINATION_MAX_LIMIT.toString()
      );
      expect(nextPageURL.searchParams.get('page')).toBe((page + 1).toString());
      expect((response.body as IGetFeesResponseBody).page).toBe(page);
    });
  });
});
