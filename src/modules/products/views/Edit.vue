<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.product', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <product-form :product-id="productId" />
      </v-slide-y-transition>
      <product-delete-dialog :product-id="productId" />
    </v-container>
  </v-card>
</template>

<script>
  import ProductForm from '../components/ProductForm.vue';
  import ProductDeleteDialog from '../components/ProductDeleteDialog.vue';

  export default {
    components: {
      'product-form': ProductForm,
      'product-delete-dialog': ProductDeleteDialog
    },
    computed: {
      productId () {
        return this.$route.params.id;
      }
    }
  }
</script>
