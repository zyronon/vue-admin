import router from './index'
import store from '../store'
import { asyncRouterMap } from './asyncRouterMap'
// import {Loading} from 'element-ui'
import globalMethods from '../utils/global-methods'
import { types } from '../store/mutation-types'
import Config from '../config'

const whiteList = ['/login']

// 每次导航都会执行这里面的方法
router.beforeEach(async (to, from, next) => {
  // 是否有token
  if (store.state.user.token) {
    // 如果前往的页面是login页面，不让他去，给导航到根页面，然后再次执行路由守卫里面的方法
    if (to.path === '/login') {
      next({ path: '/' })
    } else if (store.state.user.roles.length === 0) {
      // 如果vuex 里的user 模块的 roles 为空。那么获取调用用户信息的接口生成动态的路由
      
      const loadingInstance = ELEMENT.Loading.service({ text: '加载中' })
      
      // 如果是管理员，直接添加本地写好的动态路由，上线后记得注释掉此代码
      if (store.state.user.userInfo.account === Config.ADMIN_ACCOUNT
        && store.state.user.userInfo.password === Config.ADMIN_PASSWORD) {
        console.log('管理员账号')
        store.commit(types.SET_ROLES, asyncRouterMap)
        router.addRoutes(store.state.user.roles)
        next({ path: '/' })
        loadingInstance.close()
      } else {
        // 获取用户信息
        store.dispatch('getUserInfo').then(
          (resolve) => {
            console.log(resolve)
            // 成功提示
            globalMethods.$success(resolve)
            
            // 此处写生成动态路由的代码。权限无论是前端搞还是后端搞。最终的目的是生成一个类似于asyncRouterMap的数组，
            // 然后把生成的动态路由保存到 vuex 里面=> store.commit(types.SET_ROLES, 动态路由)
            
            // let res1 = await tools.generateRoutes()
            // console.log('不是管理员账号')
            // store.commit(types.SET_ROLES, res1)
            
            // 添加到 vuex 的 user 模块的 roles 里面。
            store.commit(types.SET_ROLES, asyncRouterMap)
            // 将动态生成的路由添加到 vue-router里面
            router.addRoutes(store.state.user.roles)
            // 然后导航回/根页面，再次执行路由守卫代码
            next({ path: '/' })
            loadingInstance.close()
          },
          (reject) => {
            globalMethods.$error(reject)
            store.commit(types.LOGOUT)
            next({ path: '/login' })
            loadingInstance.close()
          },
        )
      }
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    store.commit(types.LOGOUT)
    next({ path: '/login' })
  }
})
