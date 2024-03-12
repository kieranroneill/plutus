import { Module as NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

// enums
import { EnvironmentVariableKeyEnum } from '@app/enums';

// modules
import VersionsModule from '@app/modules/versions/module';

// types
import type { IEnvironmentVariables } from '@app/types';

@NestModule({
  imports: [
    /**
     * api
     */
    VersionsModule,

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
      }),
    }),
  ],
})
export default class Module {}
