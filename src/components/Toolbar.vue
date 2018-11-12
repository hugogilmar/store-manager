<template>
  <v-toolbar
    app
    clipped-left
    fixed
  >
    <v-toolbar-side-icon @click="drawerToggle"></v-toolbar-side-icon>
    <v-toolbar-title>
      {{ $t('app.name') }}
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Toolbar',
    methods: {
      ...mapActions([
        'drawerToggle',
      ])
    }
  }
</script>
