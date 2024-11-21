/**
 * @file jest.config.js
 * @description Configuration file for Jest, specifically set up to optimize testing for a React client application.
 * It configures Jest to use the jsdom environment, includes custom setup files, maps styles, and specifies 
 * Babel transformations for JSX/TSX files, ensuring compatibility with React and modern JavaScript.
 */

// client/jest.config.js
export default {
  // Specifies the test environment as 'jsdom' to simulate a web browser-like environment for DOM testing.
  testEnvironment: 'jest-environment-jsdom',
  
  // Specifies files to be executed after Jest's environment setup.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Maps CSS and SCSS file imports to a mock object to avoid errors during tests.
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Transforms JavaScript and TypeScript files using Babel.
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  
  // Specifies where Jest should look for test files.
  testMatch: ['<rootDir>/src/tests/**/*.test.js'],
};
