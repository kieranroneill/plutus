import { Logger, Module as NestModule } from '@nestjs/common';

// modules
import DatabaseModule from '@app/modules/database/module';

// providers
import Provider from './provider';

// services
import Service from './service';

@NestModule({
  exports: [Provider],
  imports: [DatabaseModule],
  providers: [Logger, Provider, Service],
})
export default class Module {}
