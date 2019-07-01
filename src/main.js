import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import '@/assets/scss/index.scss'
import {router} from '@/route'
import '@/route/routerControl'
import store from '@/store'
import mixin from "./utils/mixin"

Vue.config.productionTip = false
Vue.use(Element, {size: 'medium'})
Vue.prototype.$bus = new Vue()
Vue.mixin(mixin)
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
