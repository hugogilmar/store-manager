<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.product', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <new-product-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import NewProductForm from '../components/NewProductForm.vue';

  export default {
    components: {
      'new-product-form': NewProductForm
    }
  }
</script>
