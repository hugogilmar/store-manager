export default {
  state: {
    reportParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setReportParam (state, payload) {
      state.reportParams.set(payload.param, payload.value)
    },
    deleteReportParam (state, payload) {
      state.reportParams.delete(payload.param)
    }
  },
  actions: {
    setReportParam ({ commit }, payload) {
      commit('setReportParam', payload)
    },
    deleteReportParam ({ commit }, payload) {
      commit('deleteReportParam', payload)
    }
  },
  getters: {
    getReportParams (state) {
      return state.reportParams
    },
    getReportParam (state) {
      return function (param) {
        return state.reportParams.get(param)
      }
    }
  }
}
