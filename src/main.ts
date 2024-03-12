import { LoggerService } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';

// enums
import { EnvironmentVariableKeyEnum } from '@app/enums';

// modules
import AppModule from './app';

// types
import type { IEnvironmentVariables, ILogLevel } from '@app/types';

// utils
import createLoggerService from '@app/utils/createLoggerService';

(async () => {
  let app: NestApplication;
  let configService: ConfigService<IEnvironmentVariables, true>;
  let logger: LoggerService;

  try {
    app = await NestFactory.create(AppModule);
    configService = app.get(ConfigService);
    logger = createLoggerService(
      configService.get<string>(EnvironmentVariableKeyEnum.AppName),
      configService.get<ILogLevel>(EnvironmentVariableKeyEnum.LogLevel)
    );

    // setup middleware
    app.useLogger(logger);
    app.use(
      morgan('combined', {
        stream: {
          write: (message: string) => {
            logger.log(message);
          },
        },
      })
    );

    await app.listen(
      configService.get<number>(EnvironmentVariableKeyEnum.AppPort)
    );

    logger.log(`application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(error);
  }
})();
