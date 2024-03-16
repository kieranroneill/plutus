import { Module } from '@nestjs/common';

// controllers
import ChainsController from './controller';

@Module({
  controllers: [ChainsController],
})
export default class ChainsModule {}
