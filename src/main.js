import Vue from 'vue'
import Element from 'element-ui'
import VCharts from 'v-charts'
import Icon from 'vue-svg-icon/Icon';
import App from './App'
import './assets/scss/index.scss'
import router from './router'
import './router/routerControl'
import store from './store'
import mixin from './utils/mixin'
import './mock'// 导入 mock 数据处理
import api from './api'

Vue.config.productionTip = false
Vue.use(VCharts)
Vue.use(Element, { size: 'medium' })
Vue.component('icon', Icon);
Vue.prototype.$bus = new Vue()
Vue.prototype.$api = { ...api }

Vue.mixin(mixin)
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
