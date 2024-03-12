import { FactoryProvider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { Mongoose } from 'mongoose';

// enums
import { ProviderNameEnum } from '@app/enums';

// schemas
import { FeeCollectEventSchema } from '@app/schemas';

const Provider: FactoryProvider = {
  inject: [ProviderNameEnum.DatabaseConnection],
  provide: ProviderNameEnum.FeeCollectEventModel,
  useFactory: async (mongoose: Mongoose) =>
    getModelForClass(FeeCollectEventSchema, {
      existingMongoose: mongoose,
      options: {
        customName: 'fee_collect_event',
      },
    }),
};

export default Provider;
