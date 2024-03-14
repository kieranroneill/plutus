import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as Joi from 'joi';

// enums
import { EnvironmentVariableKeyEnum } from '@app/enums';

// modules
import FeesCollectedEventListenerModule from '@app/modules/fees-collected-event-listener/module';
import FeesModule from '@app/modules/fees/module';
import VersionsModule from '@app/modules/versions/module';

// providers
import AppService from './service';

// types
import type { IEnvironmentVariables } from '@app/types';

@Module({
  imports: [
    /**
     * api
     */
    FeesModule,
    VersionsModule,

    /**
     * listeners
     */
    FeesCollectedEventListenerModule,

    /**
     * misc
     */
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: Joi.object<IEnvironmentVariables, true>({
        // base
        [EnvironmentVariableKeyEnum.AppName]: Joi.string().default('plutus'),
        [EnvironmentVariableKeyEnum.AppPort]: Joi.number().default(3000),
        [EnvironmentVariableKeyEnum.AppVersion]: Joi.string()
          .empty('')
          .default(null),
        [EnvironmentVariableKeyEnum.LogLevel]: Joi.string()
          .default('error')
          .valid('debug', 'error', 'info', 'silent', 'warn'),
        [EnvironmentVariableKeyEnum.NodeEnv]: Joi.string().required(),

        // database
        [EnvironmentVariableKeyEnum.MongoDBHost]: Joi.string().required(),
        [EnvironmentVariableKeyEnum.MongoDBName]: Joi.string().required(),
        [EnvironmentVariableKeyEnum.MongoDBPassword]: Joi.string().required(),
        [EnvironmentVariableKeyEnum.MongoDBPort]: Joi.string().required(),
        [EnvironmentVariableKeyEnum.MongoDBUsername]: Joi.string().required(),
      }),
    }),
    EventEmitterModule.forRoot(),
  ],
  providers: [AppService, Logger],
})
export default class AppModule {}
