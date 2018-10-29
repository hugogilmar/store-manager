import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    login (state, token) {
      state.token = token;
    },
    logout (state) {
      state.token = null;
    }
  },
  getters: {
    authenticationToken (state) {
      return state.token;
    }
  },
  actions: {
    login({ commit }, token) {
      commit('login', token);
      router.push('/');
    },
    logout({ commit }) {
      commit('logout');
      router.push('/login');
    }
  }
});

export default store;
