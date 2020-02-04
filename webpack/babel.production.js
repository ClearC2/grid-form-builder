const path = require('path')

module.exports = (env) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: [
          path.join(__dirname, 'src'), 
          path.join(__dirname, '../src'), 
          path.join(env.projectDir, 'src')]
      }
    ]
  }
})
