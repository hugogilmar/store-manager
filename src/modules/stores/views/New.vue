<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.store', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <store-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import StoreForm from '../components/StoreForm.vue';

  export default {
    components: {
      'store-form': StoreForm
    }
  }
</script>
