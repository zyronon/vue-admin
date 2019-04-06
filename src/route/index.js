import VueRouter from 'vue-router'
import Vue from 'vue'

import _import from '@/utils/import'
import {CONSTANT} from '@/utils/const_var'
const Layout = _import('layout/layout')
Vue.use(VueRouter)

//静态路由表
export const constantRouterMap = [
    {
        path: '/login',
        name: 'login',
        component: _import('pages/login'),
        hidden: true
    },
    {
        path: '',
        name: '',
        component: Layout,
        meta: {
            title: '默认页',
            category: CONSTANT.REDIRECT
        },
        // redirect: '/organization/organization_manage',
        // redirect: '/cms/profession/profession_open_page'
        // redirect: '/cms/common/common_notice'
        redirect: '/article/index'
        // redirect: '/login'
        // redirect: '/customer_service'--------9
        // redirect: '/rent_house'
    },

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export const router = new VueRouter({
    // mode: 'history',
    routes: constantRouterMap,
    scrollBehavior: () => ({y: 0})
})
