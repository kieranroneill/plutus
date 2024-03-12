import { Logger, Module as NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// enums
import { EnvironmentVariableKeyEnum } from '@app/enums';

// modules
import FeeCollectEventRepositoryModule from '@app/modules/fee-collect-event-repository/module';
import VersionsModule from '@app/modules/versions/module';

// types
import type { IEnvironmentVariables } from '@app/types';
import Service from '../versions/service';

@NestModule({
  imports: [
    /**
     * api
     */
    VersionsModule,

    /**
     * repository
     */
    FeeCollectEventRepositoryModule,

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
  ],
  providers: [Logger, Service],
})
export default class Module {}
