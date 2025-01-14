
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots:["<rootDir>/src"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  
};