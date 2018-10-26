import VueI18n from 'vue-i18n';
import es from './locales/es';

const locales = Object.assign({}, es);

const i18n = new VueI18n({
  locale: 'es',
  messages: locales
});

export default i18n;
