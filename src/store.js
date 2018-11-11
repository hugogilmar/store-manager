import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticationToken: null,
    user: {},
    drawer: false,
    dark: false
  },
  mutations: {
    login (state, payload) {
      state.authenticationToken = payload.authenticationToken;
      state.user = payload.user;
    },
    logout (state) {
      state.authenticationToken = null;
      state.user = {};
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
      return state.authenticationToken;
    },
    currentUser (state) {
      return state.user;
    },
    drawerOpen (state) {
      return state.drawer;
    },
    darkTheme (state) {
      return state.dark;
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload);
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
