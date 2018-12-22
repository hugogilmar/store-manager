import Vue from 'vue';
import Vuex from 'vuex';
import SecureLS from 'secure-ls';
import router from './router';

Vue.use(Vuex);

let storage = new SecureLS();

const store = new Vuex.Store({
  state: {
    authenticationToken: storage.get('authenticationToken'),
    user: storage.get('user'),
    drawer: false,
    dark: false
  },
  mutations: {
    login (state, payload) {
      state.authenticationToken = payload.authenticationToken;
      state.user = payload.user;
      storage.set('authenticationToken', payload.authenticationToken);
      storage.set('user', payload.user);
    },
    logout (state) {
      state.authenticationToken = null;
      state.user = {};
      storage.remove('authenticationToken');
      storage.remove('user');
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
      commit('drawerToggle');
      commit('darkThemeToggle');
    }
  }
});

export default store;
