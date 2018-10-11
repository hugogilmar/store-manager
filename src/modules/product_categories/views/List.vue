<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.list', { entity: $tc('entities.productCategory', 2) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <product-category-list />
      </v-slide-y-transition>
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fab
          fixed
          bottom
          right
          @click="newProductCategory()"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </v-card>
</template>

<script>
  import ProductCategoryList from '../components/ProductCategoryList.vue';

  export default {
    components: {
      'product-category-list': ProductCategoryList
    },
    methods: {
      newProductCategory: function () {
        this.$router.push({ path: '/product_categories/new' });
      }
    }
  }
</script>
