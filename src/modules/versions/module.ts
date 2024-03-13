import { Logger, Module } from '@nestjs/common';

// controllers
import VersionsController from './controller';

// services
import VersionsService from './service';

@Module({
  controllers: [VersionsController],
  providers: [Logger, VersionsService],
})
export default class VersionsModule {}
