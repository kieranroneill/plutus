import type { Config } from 'jest';

import baseConfig from './jest.config';

const config: Config = {
  ...baseConfig,
  collectCoverage: false,
  testMatch: ['<rootDir>/src/**/e2e.test.ts'],
};

export default config;
