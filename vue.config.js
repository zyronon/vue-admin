// const path = require('path')

const isProduction = process.env.NODE_ENV === 'production'

// vue.config.js
module.exports = {
  publicPath: isProduction ? '' : '',
  assetsDir: isProduction ? './' : './',
  lintOnSave: true, // 取消eslint的检查
  // 减少打包面积，引入外链时用的
  configureWebpack: (config) => {
    config.externals = {// eslint-disable-line
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      axios: 'axios',
      lodash: '_',
      mockjs: 'Mock',
    }
  },
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,
  css: {},
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8863,
    https: false,
    hotOnly: false,
  },

}
