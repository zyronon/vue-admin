import Vue from 'vue'
import Vuex from 'vuex'
import Storage from '@/utils/storage'
import {ADD_HISTORY_QUERY, LOGOUT, SET_CONFIG, SET_ROLES, SET_TOKEN, SET_USERINFO} from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        roles: [],
        // userInfo: Storage.get('userInfo') === undefined ? null : JSON.parse(Cookies.get('userInfo')),
        userInfo: {},
        token: Storage.get('token') === '' ? null : Storage.get('token'),
        historyQuery: new Map(),
        isCollapse:false
    },
    mutations: {
        collapse(state){
            state.isCollapse = !state.isCollapse
        },
        [ADD_HISTORY_QUERY](state, {path, params}) {
            state.historyQuery.set(path, params)
        },
        [SET_ROLES](state, roles) {
            state.roles = roles
        },
        //设置用户信息5
        [SET_USERINFO](state, userInfo) {
            state.userInfo = userInfo
            Storage.set('userInfo', userInfo)
        },
        //设置 配置文件
        [SET_CONFIG](state, config) {
            state.config = config
        },
        //设置 token
        [SET_TOKEN](state, token) {
            state.token = token
            Storage.set('token', token)
        },
        [LOGOUT](state) {
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
        logout({commit}) {
            commit('LOGOUT')
        }
    }
})

export default store

