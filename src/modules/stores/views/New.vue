<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.store', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <new-store-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import NewStoreForm from '../components/NewStoreForm.vue';

  export default {
    components: {
      'new-store-form': NewStoreForm
    }
  }
</script>
