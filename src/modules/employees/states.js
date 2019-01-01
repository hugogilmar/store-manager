export default {
  state: {
    employeeParams: new URLSearchParams('filter[limit]=20&filter[offset]=0')
  },
  mutations: {
    setEmployeeParam (state, payload) {
      state.employeeParams.set(payload.param, payload.value)
    },
    deleteEmployeeParam (state, payload) {
      state.employeeParams.delete(payload.param)
    }
  },
  actions: {
    setEmployeeParam ({commit}, payload) {
      commit('setEmployeeParam', payload)
    },
    deleteEmployeeParam ({commit}, payload) {
      commit('deleteEmployeeParam', payload)
    }
  },
  getters: {
    getEmployeeParams (state) {
      return state.employeeParams
    },
    getEmployeeParam (state) {
      return function (param) {
        return state.employeeParams.get(param)
      }
    }
  }
}
