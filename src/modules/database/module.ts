import { Logger, Module } from '@nestjs/common';

// providers
import DatabaseProvider from './provider';

@Module({
  exports: [DatabaseProvider],
  providers: [DatabaseProvider, Logger],
})
export default class DatabaseModule {}
