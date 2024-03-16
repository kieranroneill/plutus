// configs
import { chains } from '@app/configs';

// types
import type { IChainConfig } from '@app/types';

// utils
import createChainId from './createChainId';

describe(`${__filename}`, () => {
  it('should return the namespace and the reference concatenated with a colon delimiter', () => {
    // arrange
    const chainConfig: IChainConfig = chains[0];
    // act
    const result: string = createChainId(chainConfig);

    // assert
    expect(result).toBe(`${chainConfig.namespace}:${chainConfig.reference}`);
  });
});
