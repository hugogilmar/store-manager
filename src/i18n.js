import VueI18n from 'vue-i18n';
import es from './locales/es';

const locales = Object.assign({}, es);

export default new VueI18n({
  locale: 'es',
  messages: locales
});
