import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class GetFeesParamsDTO {
  @ApiProperty({
    description: 'The partner that was used to collect fees.',
    example: '0x34B7BEb5Bb4E6504dBa8843883796eF9CbDe0a38',
    required: true,
  })
  @IsNotEmpty()
  public readonly integrator: string;
}
