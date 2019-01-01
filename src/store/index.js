import Vue from 'vue';
import Vuex from 'vuex';
import baseModule from './base';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    base: baseModule
  }
});

export default store;
