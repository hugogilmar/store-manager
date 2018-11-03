<template>
  <v-app>
    <navigation v-if="authenticationToken"></navigation>
    <toolbar></toolbar>
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
        'authenticationToken'
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
