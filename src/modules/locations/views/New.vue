<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.location', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <location-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import LocationForm from '../components/LocationForm.vue';

  export default {
    components: {
      'location-form': LocationForm
    }
  }
</script>
