<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.productCategory', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <product-category-form v-bind:product-category-id="productCategoryId" />
      </v-slide-y-transition>
      <product-category-delete-dialog />
    </v-container>
  </v-card>
</template>

<script>
  import ProductCategoryForm from '../components/ProductCategoryForm.vue';
  import ProductCategoryDeleteDialog from '../components/ProductCategoryDeleteDialog.vue';

  export default {
    components: {
      'product-category-form': ProductCategoryForm,
      'product-category-delete-dialog': ProductCategoryDeleteDialog
    },
    computed: {
      productCategoryId () {
        return this.$route.params.id;
      }
    }
  }
</script>
