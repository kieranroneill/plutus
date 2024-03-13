import { Logger, Module } from '@nestjs/common';

// modules
import DatabaseModule from '@app/modules/database/module';

// providers
import FeeRepositoryProvider from './provider';
import FeeRepositoryService from './service';

@Module({
  exports: [FeeRepositoryService],
  imports: [DatabaseModule],
  providers: [Logger, FeeRepositoryProvider, FeeRepositoryService],
})
export default class FeeRepositoryModule {}
