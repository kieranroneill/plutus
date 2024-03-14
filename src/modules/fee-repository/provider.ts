import { FactoryProvider } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';
import { Mongoose } from 'mongoose';

// enums
import { ProviderNameEnum } from '@app/enums';

// schemas
import { FeeSchema } from '@app/schemas';

const FeeRepositoryProvider: FactoryProvider = {
  inject: [ProviderNameEnum.DatabaseConnection],
  provide: ProviderNameEnum.FeeModel,
  useFactory: async (mongoose: Mongoose) =>
    getModelForClass(FeeSchema, {
      existingMongoose: mongoose,
      options: {
        customName: 'fee',
      },
    }),
};

export default FeeRepositoryProvider;
