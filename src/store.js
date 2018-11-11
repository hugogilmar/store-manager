import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null,
    drawer: false,
    dark: false
  },
  mutations: {
    login (state, token) {
      state.token = token;
    },
    logout (state) {
      state.token = null;
    },
    drawerToggle (state) {
      state.drawer = !state.drawer;
    },
    darkThemeToggle (state) {
      state.dark = !state.dark;
    }
  },
  getters: {
    authenticationToken (state) {
      return state.token;
    },
    drawerOpen (state) {
      return state.drawer;
    },
    darkTheme (state) {
      return state.dark;
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
    },
    drawerToggle({ commit }) {
      commit('drawerToggle');
    },
    darkThemeToggle({ commit }) {
      commit('darkThemeToggle');
    }
  }
});

export default store;
