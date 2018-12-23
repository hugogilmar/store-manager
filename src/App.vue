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
    <loading
      is-full-page
      :background-color="loaderBackground"
      :color="loaderColor"
      :loader="loaderStyle"
      :active="loading"
      :opacity="loaderOpacity"
    >
    </loading>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loading from 'vue-loading-overlay';
  import Navitation from './components/Navigation.vue';
  import Toolbar from './components/Toolbar.vue';

  export default {
    name: 'App',
    components: {
      'navigation': Navitation,
      'toolbar': Toolbar,
      'loading': Loading
    },
    data () {
      return {
        loaderStyle: 'bars',
        loaderOpacity: 0.5
      }
    },
    computed: {
      ...mapGetters([
        'authenticationToken',
        'darkTheme',
        'loading'
      ]),
      loaderBackground () {
        return this.darkTheme ? '#ffffff' : '#333333';
      },
      loaderColor () {
        return this.darkTheme ? '#333333' : '#ffffff';
      }
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
