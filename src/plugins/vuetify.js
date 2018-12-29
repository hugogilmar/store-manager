import Vue from 'vue';
import Vuetify from 'vuetify';
import i18n from '../i18n';

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    t: function (key, ...params) {
      return i18n.t(key, params);
    }
  }
});
