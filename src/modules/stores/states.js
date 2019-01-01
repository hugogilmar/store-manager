export default {
  state: {
    storeParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setStoreParam (state, payload) {
      state.storeParams.set(payload.param, payload.value)
    },
    deleteStoreParam (state, payload) {
      state.storeParams.delete(payload.param)
    }
  },
  actions: {
    setStoreParam ({commit}, payload) {
      commit('setStoreParam', payload)
    },
    deleteStoreParam ({commit}, payload) {
      commit('deleteStoreParam', payload)
    }
  },
  getters: {
    getStoreParams (state) {
      return state.storeParams
    },
    getStoreParam (state) {
      return function (param) {
        return state.storeParams.get(param)
      }
    }
  }
}
