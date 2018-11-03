<template>
  <v-toolbar
    app
  >
    <v-toolbar-title>
      {{ title }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Navigation',
    data () {
      return {
        title: this.$t('app.name')
      }
    }
  }
</script>
