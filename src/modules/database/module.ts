import { Logger, Module as NestModule } from '@nestjs/common';

// providers
import Provider from './provider';

@NestModule({
  exports: [Provider],
  providers: [Logger, Provider],
})
export default class Module {}
