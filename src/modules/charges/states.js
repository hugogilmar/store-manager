export default {
  state: {
    chargeParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setChargeParam (state, payload) {
      state.chargeParams.set(payload.param, payload.value)
    },
    deleteChargeParam (state, payload) {
      state.chargeParams.delete(payload.param)
    }
  },
  actions: {
    setChargeParam ({commit}, payload) {
      commit('setChargeParam', payload)
    },
    deleteChargeParam ({commit}, payload) {
      commit('deleteChargeParam', payload)
    }
  },
  getters: {
    getChargeParams (state) {
      return state.chargeParams
    },
    getChargeParam (state) {
      return function (param) {
        return state.chargeParams.get(param)
      }
    }
  }
}
