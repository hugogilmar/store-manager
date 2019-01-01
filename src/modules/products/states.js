export default {
  state: {
    productParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setProductParam (state, payload) {
      state.productParams.set(payload.param, payload.value)
    },
    deleteProductParam (state, payload) {
      state.productParams.delete(payload.param)
    }
  },
  actions: {
    setProductParam ({commit}, payload) {
      commit('setProductParam', payload)
    },
    deleteProductParam ({commit}, payload) {
      commit('deleteProductParam', payload)
    }
  },
  getters: {
    getProductParams (state) {
      return state.productParams
    },
    getProductParam (state) {
      return function (param) {
        return state.productParams.get(param)
      }
    }
  }
}
