import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  OnApplicationBootstrap,
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

    chains.forEach((chainConfig) => {
      const chainId: string = createChainId(chainConfig);

      // omit an event to start getting historic events
      const success: boolean = this.eventEmitter.emit(
        EventNameEnum.FeesCollectedEventQuery,
        new FeesCollectedQueryEventPayloadDTO({
          chainId,
        })
      );

      this.logger.debug(
        `${AppService.name}#${_functionName}: event "${EventNameEnum.FeesCollectedEventQuery}" for chain "${chainId}" emitted ${success ? 'successfully' : 'unsuccessfully'}`
      );
    });
  }
}
