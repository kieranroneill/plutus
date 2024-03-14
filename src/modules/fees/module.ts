import { Logger, Module } from '@nestjs/common';

// controllers
import FeesController from './controller';

// modules
import FeeRepositoryModule from '@app/modules/fee-repository/module';

// providers
import FeesService from './service';

@Module({
  imports: [FeeRepositoryModule],
  controllers: [FeesController],
  providers: [FeesService, Logger],
})
export default class FeesModule {}
