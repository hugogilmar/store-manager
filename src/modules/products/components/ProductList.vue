<template>
  <v-list two-line>
    <v-alert
      :value="true"
      type="info"
      v-if="products.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="product in products"
      :key="product.id"
      avatar
      @click="editProduct(product.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ product.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ product.price | currency }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="product.avatar">
        <img :src="product.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'ProductList',
    data () {
      return {
        products: [],
        product_categories: []
      }
    },
    created () {
      this.getProductCategories();
      this.getProducts();
    },
    methods: {
      getProductCategories () {
        let self = this;

        this.$axios.get('/product_categories')
        .then(function (response) {
          self.product_categories = response.data;
        })
        .catch(function (error) {
          self.product_categories = [];
        });
      },
      getProducts () {
        let self = this;

        this.$axios.get('/products')
        .then(function (response) {
          self.products = response.data;
        })
        .catch(function (error) {
          self.products = [];
        });
      },
      editProduct: function (productId) {
        this.$router.push({ path: `/products/${productId}` });
      }
    }
  };
</script>
