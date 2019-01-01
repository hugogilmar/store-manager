export default {
  state: {
    paymentMethodParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setPaymentMethodParam (state, payload) {
      state.paymentMethodParams.set(payload.param, payload.value)
    },
    deletePaymentMethodParam (state, payload) {
      state.paymentMethodParams.delete(payload.param)
    }
  },
  actions: {
    setPaymentMethodParam ({commit}, payload) {
      commit('setPaymentMethodParam', payload)
    },
    deletePaymentMethodParam ({commit}, payload) {
      commit('deletePaymentMethodParam', payload)
    }
  },
  getters: {
    getPaymentMethodParams (state) {
      return state.paymentMethodParams
    },
    getPaymentMethodParam (state) {
      return function (param) {
        return state.paymentMethodParams.get(param)
      }
    }
  }
}
