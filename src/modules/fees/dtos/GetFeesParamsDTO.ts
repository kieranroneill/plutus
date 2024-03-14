import { IsNotEmpty } from 'class-validator';

export default class GetFeesParamsDTO {
  @IsNotEmpty()
  public readonly chainId: string;
}
