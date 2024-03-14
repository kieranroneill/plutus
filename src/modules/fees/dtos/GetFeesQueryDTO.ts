import { IsOptional } from 'class-validator';

export default class GetFeesQueryDTO {
  @IsOptional()
  public readonly limit?: string;
}
