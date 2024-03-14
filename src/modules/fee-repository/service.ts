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

  public async countByChainId(chainId: string): Promise<number> {
    return await this.model.countDocuments({ chainId }).exec();
  }

  public async create(dto: CreateDTO): Promise<IFeeDocument> {
    return await this.model.create(dto);
  }

  public async findLatestBlockNumberForChainId(
    chainId: string
  ): Promise<bigint | null> {
    const document: IFeeDocument | null = await this.model
      .findOne({
        chainId,
      })
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
