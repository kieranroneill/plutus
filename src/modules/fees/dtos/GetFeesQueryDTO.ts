import { IsNumberString, IsOptional } from 'class-validator';

export default class GetFeesQueryDTO {
  @IsOptional()
  @IsNumberString()
  public readonly limit?: string;

  @IsOptional()
  @IsNumberString()
  public readonly page?: string;
}
