import { FactoryProvider, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { connect, Mongoose } from 'mongoose';

// enums
import { EnvironmentVariableKeyEnum, ProviderNameEnum } from '@app/enums';

// types
import { IEnvironmentVariables } from '@app/types';

const DatabaseProvider: FactoryProvider<Promise<Mongoose>> = {
  inject: [ConfigService, Logger],
  provide: ProviderNameEnum.DatabaseConnection,
  useFactory: async (
    configService: ConfigService<IEnvironmentVariables, true>,
    logger: LoggerService
  ): Promise<Mongoose> => {
    const _functionName: string = `useFactory`;
    const uri: string = `mongodb://${configService.get<string>(
      EnvironmentVariableKeyEnum.MongoDBHost
    )}:${configService.get<string>(EnvironmentVariableKeyEnum.MongoDBPort)}`;
    let mongoose: Mongoose;

    try {
      mongoose = await connect(uri, {
        appName: configService.get<string>(EnvironmentVariableKeyEnum.AppName),
        authSource: 'admin',
        dbName: configService.get<string>(
          EnvironmentVariableKeyEnum.MongoDBName
        ),
        pass: configService.get<string>(
          EnvironmentVariableKeyEnum.MongoDBPassword
        ),
        user: configService.get<string>(
          EnvironmentVariableKeyEnum.MongoDBUsername
        ),
      });
    } catch (error) {
      logger.error(`${__filename}#${_functionName}:`, error);

      throw error;
    }

    mongoose.connection.on('error', (error) =>
      logger.error(`${_functionName}:`, error)
    );

    return mongoose;
  },
};

export default DatabaseProvider;
