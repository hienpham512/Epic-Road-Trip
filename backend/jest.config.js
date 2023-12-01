module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverage: true,
  // collectCoverageFrom: [
  //   "src/**/*.{js,jsx,ts,tsx}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**",
  // ],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text", "html"],
};
