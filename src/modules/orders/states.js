export default {
  state: {
    orderParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setOrderParam (state, payload) {
      state.orderParams.set(payload.param, payload.value)
    },
    deleteOrderParam (state, payload) {
      state.orderParams.delete(payload.param)
    }
  },
  actions: {
    setOrderParam ({ commit }, payload) {
      commit('setOrderParam', payload)
    },
    deleteOrderParam ({ commit }, payload) {
      commit('deleteOrderParam', payload)
    }
  },
  getters: {
    getOrderParams (state) {
      return state.orderParams
    },
    getOrderParam (state) {
      return function (param) {
        return state.orderParams.get(param)
      }
    }
  }
}
