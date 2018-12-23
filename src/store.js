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
    dark: false,
    loading: false
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
    },
    loading (state, value) {
      state.loading = value
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
    },
    loading (state) {
      return state.loading
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
    },
    showLoader ({commit}) {
      commit('loading', true)
    },
    hideLoader ({commit}) {
      commit('loading', false)
    }
  }
});

export default store;
