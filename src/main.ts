import { LoggerService, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import morgan from 'morgan';

// enums
import { APIPathEnum, EnvironmentVariableKeyEnum } from '@app/enums';

// modules
import AppModule from '@app/modules/app/module';

// types
import type { IEnvironmentVariables, ILogLevel } from '@app/types';

// utils
import createLoggerService from '@app/utils/createLoggerService';
import parseVersion from '@app/utils/parseVersion';

(async () => {
  let app: NestApplication;
  let configService: ConfigService<IEnvironmentVariables, true>;
  let logger: LoggerService;
  let versions: string[];

  try {
    app = await NestFactory.create(AppModule);
    configService = app.get(ConfigService);
    logger = createLoggerService(
      configService.get<string>(EnvironmentVariableKeyEnum.AppName),
      configService.get<ILogLevel>(EnvironmentVariableKeyEnum.LogLevel)
    );
    versions = parseVersion(
      configService.get<string>(EnvironmentVariableKeyEnum.AppVersion)
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
    app.setGlobalPrefix(`${APIPathEnum.API}/v${versions[0]}`);
    app.useGlobalPipes(new ValidationPipe()); // for validating query params

    // setup open api
    SwaggerModule.setup(
      APIPathEnum.API,
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle(
            configService.get<string>(EnvironmentVariableKeyEnum.AppName)
          )
          .setDescription(
            `The ${configService.get<string>(EnvironmentVariableKeyEnum.AppName)} API description`
          )
          .setVersion(
            configService.get<string>(EnvironmentVariableKeyEnum.AppVersion)
          )
          .build()
      )
    );

    await app.listen(
      configService.get<number>(EnvironmentVariableKeyEnum.AppPort)
    );

    logger.log(`application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(error);
  }
})();
