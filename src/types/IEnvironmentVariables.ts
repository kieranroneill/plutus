// enums
import { EnvironmentVariableKeyEnum } from '@app/enums';

// types
import ILogLevel from './ILogLevel';

interface IEnvironmentVariables {
  // base
  [EnvironmentVariableKeyEnum.AppName]: string;
  [EnvironmentVariableKeyEnum.AppPort]: number;
  [EnvironmentVariableKeyEnum.AppVersion]: string;
  [EnvironmentVariableKeyEnum.LogLevel]: ILogLevel;
  [EnvironmentVariableKeyEnum.NodeEnv]: string;

  // database
  [EnvironmentVariableKeyEnum.MongoDBHost]: string;
  [EnvironmentVariableKeyEnum.MongoDBName]: string;
  [EnvironmentVariableKeyEnum.MongoDBPassword]: string;
  [EnvironmentVariableKeyEnum.MongoDBPort]: string;
  [EnvironmentVariableKeyEnum.MongoDBUsername]: string;
}

export default IEnvironmentVariables;
