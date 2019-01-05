<template>
  <v-app
    :dark="darkTheme"
  >
    <navigation v-if="getAuthenticationToken"></navigation>
    <toolbar v-if="getAuthenticationToken"></toolbar>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
    <loading></loading>
    <notification></notification>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Navitation from './components/layout/Navigation.vue';
  import Toolbar from './components/layout/Toolbar.vue';
  import Loading from './components/layout/Loading.vue';
  import Notification from './components/layout/Notification.vue';

  export default {
    name: 'App',
    components: {
      'navigation': Navitation,
      'toolbar': Toolbar,
      'loading': Loading,
      'notification': Notification
    },
    computed: {
      ...mapGetters([
        'getAuthenticationToken',
        'darkTheme',
      ])
    }
  }
</script>

<style>
  @import '../node_modules/vuetify/dist/vuetify.min.css';
  @import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';
  @import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css';
  @import '../node_modules/vue-loading-overlay/dist/vue-loading.css';

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
