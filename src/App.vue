<template>
  <v-app
    :dark="darkTheme"
  >
    <navigation v-if="authenticationToken"></navigation>
    <toolbar v-if="authenticationToken"></toolbar>
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
  import Navitation from './components/Navigation.vue';
  import Toolbar from './components/Toolbar.vue';
  import Loading from './components/Loading.vue';
  import Notification from './components/Notification.vue';

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
        'authenticationToken',
        'darkTheme',
      ])
    }
  }
</script>

<style>
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
