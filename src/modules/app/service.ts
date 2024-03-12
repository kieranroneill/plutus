import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common';

// services
import { Service as FeeCollectEventRepositoryService } from '@app/modules/fee-collect-event-repository';

@Injectable()
export class Service implements OnModuleInit {
  constructor(
    private readonly feeCollectEventRepositoryService: FeeCollectEventRepositoryService,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}
  public async onModuleInit(): Promise<void> {}
}
