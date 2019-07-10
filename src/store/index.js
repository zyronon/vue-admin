import Vue from 'vue'
import Vuex from 'vuex'
import { types } from './mutation-types'
import { layout } from './modules/layout'
import { user } from './modules/user'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    layout,
    user,
  },
  state: {
    historyQuery: new Map(),
  },
  mutations: {
    [types.ADD_HISTORY_QUERY](state, { path, params }) {
      state.historyQuery.set(path, params)
    },
    // 设置 配置文件
    [types.SET_CONFIG](state, config) {
      state.config = config
    },
  },
  actions: {
    addHistoryQuery({ commit }, { path, params }) {
      commit(types.ADD_HISTORY_QUERY, { path, params })
    },
  },
})

export default store
