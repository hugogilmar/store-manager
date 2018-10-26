<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.product', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <product-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import ProductForm from '../components/ProductForm.vue';

  export default {
    components: {
      'product-form': ProductForm
    }
  }
</script>
