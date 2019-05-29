import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Storage from '@/utils/storage'

const store = new Vuex.Store({
    state: {
        userCanAccess: [],
        roles: [],
        // userInfo: Storage.get('userInfo') === undefined ? null : JSON.parse(Cookies.get('userInfo')),
        userInfo: {name:'test',avatar:'https://i.loli.net/2018/08/18/5b7819891bab1.jpg'},
        token: Storage.get('token'),
        historyQuery: new Map()
    },
    mutations: {
        ADD_HISTORY_QUERY(state, {path, params}) {
            state.historyQuery.set(path, params)
        },
        setUserCanAccess(state, userCanAccess) {
            state.userCanAccess = userCanAccess
        },
        setRoles(state, roles) {
            state.roles = roles
        },
        //设置用户信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
            Storage.set('userInfo', userInfo)
        },
        //设置 配置文件
        setConfig(state, config) {
            state.config = config
        },
        //设置 token
        setToken(state, token) {
            state.token = token
            Storage.set('token', token)
        },
        LOGOUT(state) {
            Storage.remove('token')
            Storage.remove('userInfo')
            state.token = null
            state.userInfo = null
        }
    },
    actions: {
        addHistoryQuery({commit}, {path, params}) {
            commit('ADD_HISTORY_QUERY', {path, params})
        },
        logout({commit}){
            commit('LOGOUT')
        }
    }
})

export default store

