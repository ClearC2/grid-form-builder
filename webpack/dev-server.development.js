const utils = require('@clearc2/c2-react-config/webpack/utils')

module.exports = (env) => utils.extendPreset(env, 'dev-server.development',
  {
    devServer: {
      port: 8777,
      open: true
    }
  }
)
