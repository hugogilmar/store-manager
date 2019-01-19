<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.select', { entity: $tc('entities.store', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <store-select />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import StoreSelect from '../components/StoreSelect.vue';

  export default {
    components: {
      'store-select': StoreSelect
    }
  }
</script>
