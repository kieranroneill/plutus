import { Test, TestingModule } from '@nestjs/testing';

// providers
import FeeRepositoryService from '@app/modules/fee-repository/service';
import FeeCollectdEventListenerService from './service';

describe.skip('FeeCollectdEventListenerService.name', () => {
  let service: FeeCollectdEventListenerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeeCollectdEventListenerService],
    })
      .useMocker((token) => {
        if (token === FeeRepositoryService) {
          return {
            bulkCreate: jest.fn().mockResolvedValue({}),
            findLatestBlockNumber: jest.fn().mockResolvedValue(BigInt(1234)),
          };
        }

        return token;
      })
      .compile();

    service = module.get(FeeCollectdEventListenerService);
  });

  describe('onModuleInit()', () => {
    it('should', async () => {
      // console.log('here:', await service.handleFeesCollectedQueryEvent());
    });
  });
});
