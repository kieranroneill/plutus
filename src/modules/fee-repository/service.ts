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

  public async create(dto: CreateDTO): Promise<IFeeDocument> {
    const document: IFeeDocument = new this.model(dto);

    return await document.save();
  }

  public async findLatestBlockNumber(): Promise<bigint | null> {
    const document: IFeeDocument | null = await this.model
      .findOne()
      .sort({
        blockNumber: 'asc',
        createdAt: 'asc',
      })
      .exec();

    if (!document) {
      return null;
    }

    return BigInt(document.blockNumber);
  }
}
