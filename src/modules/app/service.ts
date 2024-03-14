import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

// configs
import { chains } from '@app/configs';

// dtos
import { FeesCollectedQueryEventPayloadDTO } from '@app/modules/fees-collected-event-listener';

// enums
import { EventNameEnum } from '@app/enums';

// utils
import createChainId from '@app/utils/createChainId';

@Injectable()
export default class AppService implements OnApplicationBootstrap {
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject(Logger) private readonly logger: LoggerService
  ) {}

  public onApplicationBootstrap(): void {
    const _functionName: string = 'onApplicationBootstrap';

    // omit an event for each chain
    chains.forEach((value) => {
      const chainId: string = createChainId(value);
      const success: boolean = this.eventEmitter.emit(
        EventNameEnum.FeesCollectedQuery,
        new FeesCollectedQueryEventPayloadDTO({
          chainId,
        })
      );

      this.logger.debug(
        `${AppService.name}#${_functionName}: event "${EventNameEnum.FeesCollectedQuery}" for chain "${chainId}" emitted ${success ? 'successfully' : 'unsuccessfully'}`
      );
    });
  }
}
