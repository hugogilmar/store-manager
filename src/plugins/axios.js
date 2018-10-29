import Vue from 'vue';
import axios from 'axios';
import store from '../store';
import NProgress from 'nprogress';

let config = {
  baseURL: process.env.VUE_APP_API_BASE
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    if (store.getters.authenticationToken) {
      config.headers.Authorization = store.getters.authenticationToken;
    }

    NProgress.start();

    return config;
  },
  function(error) {
    NProgress.done();

    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    NProgress.done();

    return response;
  },
  function(error) {
    NProgress.done();

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
