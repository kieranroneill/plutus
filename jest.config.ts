import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

// config
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'node',
  verbose: true,
};

export default config;