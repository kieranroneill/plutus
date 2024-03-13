import { Logger, Module } from '@nestjs/common';

// modules
import FeeRepositoryModule from '@app/modules/fee-repository/module';

// providers
import FeesCollectedEventListenerService from './service';

@Module({
  imports: [FeeRepositoryModule],
  providers: [FeesCollectedEventListenerService, Logger],
})
export default class FeesCollectedEventListenerModule {}
