import router from '@/route'
import store from '@/store'
import {asyncRouterMap} from '@/route/asyncRouterMap'
import {Loading} from 'element-ui'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // console.log('beforeEach-to', to)
    // console.log('beforeEach-from', from)
    // console.log('token', Cookies.get('token'))
    // console.log('userInfo', Cookies.get('userInfo').length,'---')
    // console.log('userInfo', store.state.userInfo,'---')
    // console.log('token', store.state.token)
    // console.log('roles', store.state.roles)
    // console.log('asyncRouterMap', asyncRouterMap)
    //是否有token

    if (store.state.token) {
        //如果前往的页面是login页面，
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            //如果userinfo为空。那么获取调用用户信息的接口
            if (store.state.roles.length === 0) {
                let loadingInstance = Loading.service({text: '加载中'})

                store.commit('SET_ROLES', asyncRouterMap)
                // if (store.state.userInfo.account === 'testtest' && store.state.userInfo.password === '666') {
                //     console.log('管理员账号')
                //     store.commit('setRoles', asyncRouterMap)
                // } else {
                //     // await tools.generateRoute2()
                //     // await tools.generateRoute1()
                //     // let res1 = await tools.generateRoutes()
                //     // console.log('不是管理员账号')
                //     // store.commit('setRoles', res1)
                // }

                // console.log('state--roles',store.state.roles)

                router.addRoutes(store.state.roles)

                // if (store.state.roles.length === 1) {
                //     next({path: store.state.roles[0].path})
                // } else {
                    next({path: '/'})
                // }
                loadingInstance.close()

            } else {
                next()
            }
        }
    } else if (whiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        //没有token值
        store.state.userInfo = null
        next('/login')
        // let load = Loading.service({
        //     text: "登录过期，请重新登录..."
        // })
        // setTimeout(() => {
        //     load.close()
        //     next('/login')
        // }, 1500)
    }
})

router.afterEach(() => {
    // console.log('afterEach')
})

