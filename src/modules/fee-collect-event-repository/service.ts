import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

// dtos
import { CreateDTO } from './dtos';

// enums
import { ProviderNameEnum } from '@app/enums';

// types
import type { IFeeCollectEventSchema } from '@app/types';

@Injectable()
export default class Service {
  constructor(
    @Inject(ProviderNameEnum.FeeCollectEventModel)
    private readonly model: Model<IFeeCollectEventSchema>
  ) {}

  public async create(dto: CreateDTO): Promise<IFeeCollectEventSchema> {
    const document: IFeeCollectEventSchema = new this.model(dto);

    return await document.save();
  }

  public async findAll(): Promise<IFeeCollectEventSchema[]> {
    return this.model.find().exec();
  }
}
