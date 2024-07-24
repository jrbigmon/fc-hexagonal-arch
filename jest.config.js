/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  rootDir: "./",
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "<rootDir>/src/**/constant.ts",
  ],
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
};
