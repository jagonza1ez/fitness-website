// client/jest.setup.js
import '@testing-library/jest-dom';

// client/jest.config.js
export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Use only jest.setup.js here
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
  };
  
  