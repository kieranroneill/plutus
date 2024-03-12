import { Logger, Module as NestModule } from '@nestjs/common';

// controllers
import Controller from './controller';

// services
import Service from './service';

@NestModule({
  controllers: [Controller],
  providers: [Logger, Service],
})
export default class Module {}
