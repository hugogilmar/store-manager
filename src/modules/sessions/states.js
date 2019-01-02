import SecureLS from 'secure-ls';
import router from '../../router/';

let storage = new SecureLS();

export default {
  state: {
    authenticationToken: storage.get('authenticationToken'),
    user: storage.get('user'),
    storeId: storage.get('storeId')
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
    storeId (state, value) {
      state.storeId = value;
      storage.set('storeId', value);
    }
  },
  getters: {
    getAuthenticationToken (state) {
      return state.authenticationToken;
    },
    getUser (state) {
      return state.user;
    },
    getStoreId (state) {
      return state.storeId;
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('login', payload);
      router.push('/');
    },
    logout ({ commit }) {
      commit('logout');
      router.push('/login');
    },
    setStoreId ({ commit}, value) {
      commit('storeId', value);
    }
  }
}
