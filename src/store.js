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
    loader: {
      loading: false,
      style: 'bars',
      opacity: 0.5
    },
    snackbar: {
      visible: false,
      color: 'info',
      message: '',
      timeOut: 3000
    }
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
    loaderLoading (state, value) {
      state.loader.loading = value;
    },
    displaySnackbar (state, payload) {
      state.snackbar.message = payload.message
      state.snackbar.color = payload.color
      state.snackbar.visible = true
    },
    dismissSnackbar (state) {
      state.snackbar.visible = false
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
    loaderLoading (state) {
      return state.loader.loading;
    },
    loaderStyle (state) {
      return state.loader.style;
    },
    loaderOpacity (state) {
      return state.loader.opacity;
    },
    loaderBackground (state) {
      return state.dark ? '#ffffff' : '#333333';
    },
    loaderColor (state) {
      return state.dark ? '#333333' : '#ffffff';
    },
    snackbarVisible (state) {
      return state.snackbar.visible;
    },
    snackbarColor (state) {
      return state.snackbar.color;
    },
    snackbarMessage (state) {
      return state.snackbar.message;
    },
    snackbarTimeOut (state) {
      return state.snackbar.timeOut;
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
      commit('loaderLoading', true)
    },
    hideLoader ({commit}) {
      commit('loaderLoading', false)
    },
    displaySnackbar ({commit}, payload) {
      commit('displaySnackbar', payload);
    },
    dismissSnackbar ({commit}) {
      commit('dismissSnackbar');
    }
  }
});

export default store;
