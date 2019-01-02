export default {
  state: {
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
    drawerToggle ({ commit }) {
      commit('drawerToggle');
    },
    darkThemeToggle ({ commit }) {
      commit('drawerToggle');
      commit('darkThemeToggle');
    },
    showLoader ({ commit }) {
      commit('loaderLoading', true)
    },
    hideLoader ({ commit }) {
      setTimeout(function () {
        commit('loaderLoading', false);
      }, 1000);
    },
    displaySnackbar ({ commit }, payload) {
      commit('displaySnackbar', payload);
    },
    dismissSnackbar ({ commit }) {
      commit('dismissSnackbar');
    }
  }
}
