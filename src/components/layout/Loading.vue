<template>
  <loading
    is-full-page
    :background-color="loaderBackground"
    :color="loaderColor"
    :loader="loaderStyle"
    :active="loaderLoading"
    :opacity="loaderOpacity"
  >
  </loading>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loading from 'vue-loading-overlay';

  export default {
    name: 'Loading',
    components: {
      'loading': Loading
    },
    computed: {
      ...mapGetters([
        'loaderLoading',
        'loaderStyle',
        'loaderOpacity',
        'loaderBackground',
        'loaderColor'
      ])
    }
  }
</script>
