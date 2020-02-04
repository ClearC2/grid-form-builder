const path = require('path')
const {webpackConfig} = require('@clearc2/c2-react-config')

// add analyzer to inspect bundle
const {presets} = webpackConfig
presets.common = presets.common.concat(['alias'])

module.exports = (env) => {
  env.presetDir = path.join(__dirname, 'webpack')
  env.projectDir = path.join(__dirname, 'example')
  return webpackConfig(env)
}
