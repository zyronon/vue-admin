import { types } from '../mutation-types'

export const layout = {
  // namespaced: true,
  state: {
    isLeftCollapse: false,
    isRightCollapse: true,
  },
  mutations: {
    [types.COLLAPSE_LEFT](state) {
      state.isLeftCollapse = !state.isLeftCollapse
    },
    [types.COLLAPSE_RIGHT](state) {
      state.isRightCollapse = !state.isRightCollapse
    },
  },
  getters: {
  },
  actions: {},
}
export default {}
