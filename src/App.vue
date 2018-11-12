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
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Navitation from './components/Navigation.vue';
  import Toolbar from './components/Toolbar.vue';

  export default {
    name: 'App',
    components: {
      'navigation': Navitation,
      'toolbar': Toolbar
    },
    computed: {
      ...mapGetters([
        'authenticationToken',
        'darkTheme'
      ])
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
