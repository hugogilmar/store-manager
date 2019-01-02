export default {
  state: {
    locationParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setLocationParam (state, payload) {
      state.locationParams.set(payload.param, payload.value)
    },
    deleteLocationParam (state, payload) {
      state.locationParams.delete(payload.param)
    }
  },
  actions: {
    setLocationParam ({ commit }, payload) {
      commit('setLocationParam', payload)
    },
    deleteLocationParam ({ commit }, payload) {
      commit('deleteLocationParam', payload)
    }
  },
  getters: {
    getLocationParams (state) {
      return state.locationParams
    },
    getLocationParam (state) {
      return function (param) {
        return state.locationParams.get(param)
      }
    }
  }
}
