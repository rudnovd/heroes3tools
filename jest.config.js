module.exports = {
  preset: 'ts-jest',
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['fake-indexeddb/auto', './src/assets/database/heroes.ts'],
  moduleFileExtensions: ['ts', 'js', 'node'],
}
