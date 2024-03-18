import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export default class GetFeesQueryDTO {
  @ApiProperty({
    default: 25,
    description: 'The amount of results to return.',
    maximum: 25,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  public readonly limit?: string;

  @ApiProperty({
    default: 1,
    description:
      'The page of results. A page is determined by the limit * page.',
    required: false,
  })
  @IsOptional()
  @IsNumberString()
  public readonly page?: string;
}
