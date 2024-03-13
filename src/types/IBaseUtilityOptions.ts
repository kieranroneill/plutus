import type { LoggerService } from '@nestjs/common';

interface IBaseUtilityOptions {
  logger: LoggerService;
}

export default IBaseUtilityOptions;
