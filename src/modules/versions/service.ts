import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mongoose } from 'mongoose';

// enums
import { EnvironmentVariableKeyEnum, ProviderNameEnum } from '@app/enums';

// types
import type { IEnvironmentVariables } from '@app/types';
import type { IVersionsResponseBody } from './types';

// utils
import parseMongoDBConnectionState from '@app/utils/parseMongoDBConnectionState';

@Injectable()
export default class VersionsService {
  constructor(
    @Inject(ProviderNameEnum.DatabaseConnection)
    private readonly mongoose: Mongoose,
    private readonly configService: ConfigService<IEnvironmentVariables, true>
  ) {}

  public async get(): Promise<IVersionsResponseBody> {
    return {
      databases: [
        {
          status: parseMongoDBConnectionState(
            this.mongoose.connection.readyState
          ),
          type: 'mongodb',
          version: this.mongoose.version,
        },
      ],
      environment:
        this.configService.get<string>(EnvironmentVariableKeyEnum.NodeEnv) ||
        null,
      name:
        this.configService.get<string>(EnvironmentVariableKeyEnum.AppName) ||
        null,
      version: this.configService.get<string | null>(
        EnvironmentVariableKeyEnum.AppVersion
      ),
    };
  }
}
