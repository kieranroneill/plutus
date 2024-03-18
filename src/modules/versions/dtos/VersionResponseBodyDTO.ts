import { ApiProperty } from '@nestjs/swagger';

// dtos
import DatabaseConnectionResponseBodyDTO from './DatabaseConnectionResponseBodyDTO';

interface IProps {
  databases: DatabaseConnectionResponseBodyDTO[];
  environment: string | null;
  name: string | null;
  version: string | null;
}

export default class VersionResponseBodyDTO {
  @ApiProperty({
    description: 'Database connection information.',
  })
  public readonly databases: DatabaseConnectionResponseBodyDTO[];
  @ApiProperty({
    description: 'The environment of the API, e.g. "production".',
  })
  public readonly environment: string | null;
  @ApiProperty({
    description: 'The name of the API.',
  })
  public readonly name: string | null;
  @ApiProperty({
    description: 'The version of the API.',
  })
  public readonly version: string | null;

  constructor({ databases, environment, name, version }: IProps) {
    this.databases = databases;
    this.environment = environment;
    this.name = name;
    this.version = version;
  }
}
