module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 0,
      lines: 25,
      statements: 25,
    },
  },
  setupFilesAfterEnv: ['./jest/customMatchers.js'],
}
