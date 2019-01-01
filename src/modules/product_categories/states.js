export default {
  state: {
    productCategoryParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setProductCategoryParam (state, payload) {
      state.productCategoryParams.set(payload.param, payload.value)
    },
    deleteProductCategoryParam (state, payload) {
      state.productCategoryParams.delete(payload.param)
    }
  },
  actions: {
    setProductCategoryParam ({commit}, payload) {
      commit('setProductCategoryParam', payload)
    },
    deleteProductCategoryParam ({commit}, payload) {
      commit('deleteProductCategoryParam', payload)
    }
  },
  getters: {
    getProductCategoryParams (state) {
      return state.productCategoryParams
    },
    getProductCategoryParam (state) {
      return function (param) {
        return state.productCategoryParams.get(param)
      }
    }
  }
}
