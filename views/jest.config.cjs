module.exports = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!(chai)/)"],
  moduleNameMapper: {'\\.(css|less)$': '<rootDir>/src/styleMock.js'}
};