import Vue from 'vue';
import VueI18n from 'vue-i18n';
import es from './locales/es';

Vue.use(VueI18n);

const locales = Object.assign({}, es);

const i18n = new VueI18n({
  locale: 'es',
  messages: locales
});

export default i18n;
