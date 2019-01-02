import SecureLS from 'secure-ls';
import router from '../../router/';

let storage = new SecureLS();

export default {
  state: {
    authenticationToken: storage.get('authenticationToken'),
    user: storage.get('user')
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
    }
  },
  getters: {
    authenticationToken (state) {
      return state.authenticationToken;
    },
    currentUser (state) {
      return state.user;
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
    }
  }
}
