<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.productCategory', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <product-category-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import ProductCategoryForm from '../components/ProductCategoryForm.vue';

  export default {
    components: {
      'product-category-form': ProductCategoryForm
    }
  }
</script>
