// https://cli.vuejs.org/

const path = require('path')

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
    return path.join(__dirname, dir)
}

let isProduction = process.env.NODE_ENV === 'production'

// vue.config.js
module.exports = {
    publicPath: isProduction ? '' : '',
    outputDir: process.env.outputDir,
    assetsDir: './',
    lintOnSave: false,//取消eslint的检查
    // configureWebpack: config => {
    //     config.externals = {
    //         "vue": "Vue",
    //         "vuex": "Vuex",
    //         "vue-router": "VueRouter",
    //         "element-ui": "ELEMENT",
    //         "axios": "axios"
    //     }
    // },
    // 选项...
    chainWebpack: config => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
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
