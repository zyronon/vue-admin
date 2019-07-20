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
            // vue: 'Vue',
            // vuex: 'Vuex',
            // 'vue-router': 'VueRouter',
            // 'element-ui': 'ELEMENT',
            // axios: 'axios',
            // lodash: '_',
            // mockjs: 'Mock',
        }
    },
    /* chainWebpack: config => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      // .set('@', resolve('src')) vue会默认生成@的指引，所以这一行是多余的
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
      .set('router', resolve('src/router'))
    
    config.resolve.extensions
      .add('.js')
      .add('.vue')
    // .add('.styl')
    
    config.module.rule('svg').uses.clear()
    config.module.rule('svg').use('raw-loader').loader('raw-loader')
    // config.module.rule('css').use('raw-loader').loader('raw-loader')
    
    //config.when(approval.env.NODE_ENV === 'production', config =>
    //  config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
    //)
  }, */
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
