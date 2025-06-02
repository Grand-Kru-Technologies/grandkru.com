module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }],
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/mocks/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/styleMock.js',
    '^vue3-carousel$': '<rootDir>/test/mocks/vue3-carousel.js',
    '^@emailjs/browser$': '<rootDir>/test/mocks/emailjs.js'
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
<<<<<<< HEAD
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  testMatch: [
    '**/tests/unit/**/*.spec.[jt]s?(x)',
    '**/__tests__/*.[jt]s?(x)'
  ],
  transformIgnorePatterns: ['/node_modules/']
=======
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/*.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/?(*.)(spec|test).(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!vue3-carousel|@emailjs/browser)'
  ]
>>>>>>> 8fe41db (WIP: Glassomorphism)
}