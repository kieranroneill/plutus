import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

// constants
import { FEE_PAGINATION_MAX_LIMIT } from '@app/constants';

// dtos
import {
  CreateOptionsDTO,
  FindByPageOptionsDTO,
  FindByPageResultDTO,
} from './dtos';

// enums
import { ProviderNameEnum } from '@app/enums';

// types
import type { IFeeDocument } from '@app/types';
import type { IFindByPageAggregateResult } from './types';

@Injectable()
export default class FeeRepositoryService {
  constructor(
    @Inject(ProviderNameEnum.FeeModel)
    private readonly model: Model<IFeeDocument>
  ) {}

  public async bulkCreate(dtos: CreateOptionsDTO[]): Promise<IFeeDocument[]> {
    return await this.model.create(dtos);
  }

  public async countByChainId(chainId: string): Promise<number> {
    return await this.model.countDocuments({ chainId }).exec();
  }

  public async create(dto: CreateOptionsDTO): Promise<IFeeDocument> {
    return await this.model.create(dto);
  }

  public async findByPage({
    chainId,
    limit = FEE_PAGINATION_MAX_LIMIT,
    page = 1,
  }: FindByPageOptionsDTO): Promise<FindByPageResultDTO> {
    const result: IFindByPageAggregateResult[] =
      await this.model.aggregate<IFindByPageAggregateResult>([
        {
          $match: {
            chainId,
          },
        },
        {
          $facet: {
            metadata: [
              {
                $count: 'total',
              },
            ],
            data: [
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
            ],
          },
        },
      ]);

    return new FindByPageResultDTO({
      data: result[0].data,
      limit,
      page,
      total: result[0].metadata[0].total,
    });
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
