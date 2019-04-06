import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userCanAccess: [],
        roles: [],
        // userInfo: Cookies.get('userInfo') === undefined ? null : JSON.parse(Cookies.get('userInfo')),
        userInfo: {name:'test',avatar:'https://i.loli.net/2018/08/18/5b7819891bab1.jpg'},
        token: Cookies.get('token') === undefined ? null : Cookies.get('token'),
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
            Cookies.set('userInfo', userInfo, {expires: 15})
        },
        //设置 配置文件
        setConfig(state, config) {
            state.config = config
        },
        //设置 token
        setToken(state, token) {
            state.token = token
            Cookies.set('token', token, {expires: 15})
        },
        logout(state) {
            Cookies.remove('token')
            Cookies.remove('userInfo')
            state.token = null
            state.userInfo = null
        }
    },
    actions: {
        addHistoryQuery({commit}, {path, params}) {
            commit('ADD_HISTORY_QUERY', {path, params})
        }
    }
})

export default store

