import { types } from '../mutation-types'
import User from '../../api/user'
import Storage from '../../utils/storage'

export const user = {
    // namespaced: true,
    state: {
        userInfo: {},
        token: Storage.get('token') === '' ? null : Storage.get('token'),
        roles: [],
        notReadMessages: [],
    },
    mutations: {
        // 设置用户信息
        [types.SET_USERINFO](state, userInfo) {
            state.userInfo = userInfo
        },
        // 设置 token
        [types.SET_TOKEN](state, token) {
            state.token = token
            Storage.set('token', token)
        },
        [types.LOGOUT](state) {
            Storage.remove('token')
            state.token = null
            state.userInfo = null
            state.roles = []
        },
        [types.SET_ROLES](state, roles) {
            state.roles = roles
        },
        // 设置所有未读消息
        [types.SET_NOT_READ_MESSAGES](state, message) {
            state.notReadMessages = message
        },
        // 设置所有未读消息
        [types.SET_NOT_READ_MESSAGES2](state, message) {
            state.notReadMessages = []
        },
    },
    getters: {},
    actions: {
        logout({ commit }) {
            commit(types.LOGOUT)
        },
        async getUserInfo({ commit }) {
            const res = await User.userInfo()
            if (res.code === '000000') {
                commit(types.SET_USERINFO, res.data)
                return Promise.resolve(res.msg)
            }
            return Promise.reject(res.msg)
        },
    },
}
export default {}
