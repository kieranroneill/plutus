import type { Config } from 'jest';

import baseConfig from './jest.config';

const config: Config = {
  ...baseConfig,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/**/{!(e2e),}.test.ts'],
};

export default config;
