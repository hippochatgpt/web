const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  parallel: false,
  lintOnSave: false,
  devServer: {
    port: 3001,
    disableHostCheck: true,
    hot: true
  },
  productionSourceMap: process.env.NODE_ENV !== 'production', //去除打包后js的map文件

  configureWebpack: {
    resolve: {
      alias: {
        '@a': resolve('src/assets'),
        '@c': resolve('src/components'),
        '@v': resolve('src/views'),
        '@api': resolve('src/api'),
        '@utils': resolve('src/utils')
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/assets/scss/global-scss.scss')]
    }
  }
}
