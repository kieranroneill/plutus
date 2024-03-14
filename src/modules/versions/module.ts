import { Logger, Module } from '@nestjs/common';

// controllers
import VersionsController from './controller';

// providers
import DatabaseModule from '@app/modules/database/module';
import VersionsService from './service';

@Module({
  imports: [DatabaseModule],
  controllers: [VersionsController],
  providers: [Logger, VersionsService],
})
export default class VersionsModule {}
