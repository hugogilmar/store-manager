import '@babel/polyfill'
import Vue from "vue";
import './plugins/axios';
import './plugins/vuetify';
import './plugins/vue-i18n';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
