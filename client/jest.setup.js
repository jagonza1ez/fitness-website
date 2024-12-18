/**
 * @file jest.setup.js
 * @description Sets up Jest configurations for React component testing, adding custom matchers from Testing Library.
 */

// Import custom Jest matchers from @testing-library/jest-dom for assertions on DOM elements
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
