<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.location', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <location-form :location-id="locationId" />
      </v-slide-y-transition>
      <location-delete-dialog :location-id="locationId" />
    </v-container>
  </v-card>
</template>

<script>
  import LocationForm from '../components/LocationForm.vue';
  import LocationDeleteDialog from '../components/LocationDeleteDialog.vue';

  export default {
    components: {
      'location-form': LocationForm,
      'location-delete-dialog': LocationDeleteDialog
    },
    computed: {
      locationId () {
        return this.$route.params.id;
      }
    }
  }
</script>
