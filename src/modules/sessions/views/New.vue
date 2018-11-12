<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.session', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <session-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import SessionForm from '../components/SessionForm.vue';

  export default {
    components: {
      'session-form': SessionForm
    }
  }
</script>
