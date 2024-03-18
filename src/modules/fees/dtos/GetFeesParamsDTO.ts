import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class GetFeesParamsDTO {
  @ApiProperty({
    description:
      'The ID of the chain. This is the concatenation of the chain namespace and reference as specified in CAIP-2.',
    example: 'eip155:137',
    required: true,
  })
  @IsNotEmpty()
  public readonly chainId: string;
}
