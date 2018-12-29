import Vue from 'vue';
import VeeValidate from 'vee-validate';
import es from 'vee-validate/dist/locale/es';

Vue.use(VeeValidate, {
  locale: 'es',
  dictionary: {
    es: es
  }
});
