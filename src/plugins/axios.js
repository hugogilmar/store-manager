import Vue from 'vue';
import axios from 'axios';
import store from '../store';

let config = {
  baseURL: process.env.VUE_APP_API_BASE
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    if (store.getters.authenticationToken) {
      config.headers.Authorization = store.getters.authenticationToken;
    }

    store.dispatch('showLoader');

    return config;
  },
  function(error) {
    store.dispatch('hideLoader');

    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    store.dispatch('hideLoader');

    return response;
  },
  function(error) {
    store.dispatch('hideLoader');

    if (error.response.status === 401) {
      store.dispatch('logout');
    }

    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin);

export default Plugin;
