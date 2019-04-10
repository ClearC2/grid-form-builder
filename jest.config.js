/* eslint-disable max-len */
module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  roots: [
    './src'
  ]
}
