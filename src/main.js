import Vue from 'vue'
import Element from 'element-ui'
import scroll from 'vue-seamless-scroll'
import Icon from 'vue-svg-icon/Icon.vue'
import '@/theme/element-#41B883/index.css'
import '@/assets/scss/index.scss'
import '@/mock'


import App from '@/App'
import {router} from '@/router'
import '@/router/routerControl'
import store from '@/store'

import i18n from '@/lang'

import dayjs from 'dayjs'
// import "./assets/icon/iconfont.css"


Vue.component('icon', Icon)

Vue.use(scroll)
Vue.use(Element, {
    size: 'medium',
    i18n: (key, value) => i18n.t(key, value)
})
Vue.filter('processStatus', function (value) {
    switch (value) {
        case '100':
            return '审核中'
        case '101':
            return '进行中'
        case '102':
            return '已结束'
    }
})
Vue.filter('date', function (value, format) {
    return dayjs(value).format(format)
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {App},
    template: '<App/>',

})
 