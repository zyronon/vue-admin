import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import '@/assets/scss/index.scss'
import {router} from '@/route'
import '@/route/routerControl'
import store from '@/store'
import filters from '@/utils/filters'
import tools from '@/utils/tools'
import Icon from 'vue-svg-icon/Icon.vue'

Vue.config.productionTip = false

Vue.component('icon', Icon)
// Vue.use(ELEMENT)

Vue.use(Element, {size: 'medium'})

//将filter里面的方法添加了vue的筛选器上
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//将tools里面的方法挂载到vue上,以方便用调用，直接this.$xxx方法名就可以了
Object.keys(tools).forEach(key => {
    Vue.prototype[key] = tools[key]
})

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
