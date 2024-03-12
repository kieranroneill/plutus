import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// enums
import { EnvironmentVariableKeyEnum } from '@app/enums';

// types
import type { IEnvironmentVariables } from '@app/types';
import type { IVersionsResponseBody } from './types';

@Injectable()
export default class Service {
  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables, true>
  ) {}

  public async get(): Promise<IVersionsResponseBody> {
    return {
      name:
        this.configService.get<string>(EnvironmentVariableKeyEnum.AppName) ||
        null,
      environment:
        this.configService.get<string>(EnvironmentVariableKeyEnum.NodeEnv) ||
        null,
      version: this.configService.get<string | null>(
        EnvironmentVariableKeyEnum.AppVersion
      ),
    };
  }
}
