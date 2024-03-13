import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

// dtos
import { CreateDTO } from './dtos';

// enums
import { ProviderNameEnum } from '@app/enums';

// types
import type { IFeeDocument } from '@app/types';

@Injectable()
export default class FeeRepositoryService {
  constructor(
    @Inject(ProviderNameEnum.FeeModel)
    private readonly model: Model<IFeeDocument>
  ) {}

  public async bulkCreate(dtos: CreateDTO[]): Promise<IFeeDocument[]> {
    return await this.model.create(dtos);
  }

  public async findLatestBlockNumber(): Promise<bigint | null> {
    const document: IFeeDocument | null = await this.model
      .findOne()
      .sort({
        blockNumber: -1,
        createdAt: -1,
      })
      .exec();

    if (!document) {
      return null;
    }

    return BigInt(document.blockNumber);
  }
}
