import { ApiProperty } from '@nestjs/swagger';

// enums
import { ConnectionStatusEnum } from '@app/enums';

interface IProps {
  status: ConnectionStatusEnum;
  type: string;
  version: string;
}

export default class DatabaseConnectionResponseBodyDTO {
  @ApiProperty({
    description: 'The connection status of the database.',
  })
  public readonly status: ConnectionStatusEnum;
  @ApiProperty({
    description: 'The type of database.',
    enum: ConnectionStatusEnum,
    enumName: 'ConnectionStatusEnum',
  })
  public readonly type: string;
  @ApiProperty({
    description: 'The version of the database.',
  })
  public readonly version: string;

  constructor({ status, type, version }: IProps) {
    this.status = status;
    this.type = type;
    this.version = version;
  }
}
