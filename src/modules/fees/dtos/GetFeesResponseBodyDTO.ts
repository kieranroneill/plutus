import { ApiProperty } from '@nestjs/swagger';

// types
import type { IFeeDocument } from '@app/types';

interface IProps {
  data: IFeeDocument[];
  limit: number;
  nextPageURL: string | null;
  page: number;
  total: number;
}

export default class GetFeesResponseBodyDTO {
  @ApiProperty({
    description: 'The fees collected for a given block.',
  })
  public readonly data: IFeeDocument[];
  @ApiProperty({
    description: 'The total number of results in the query.',
  })
  public readonly limit: number;
  @ApiProperty({
    description: 'The URL to the next page.',
  })
  public readonly nextPageURL: string | null;
  @ApiProperty({
    description: 'The current page.',
  })
  public readonly page: number;
  @ApiProperty({
    description: 'Total number of records for the chain.',
  })
  public readonly total: number;

  constructor({ data, limit, nextPageURL, page, total }: IProps) {
    this.data = data;
    this.limit = limit;
    this.nextPageURL = nextPageURL;
    this.page = page;
    this.total = total;
  }
}
