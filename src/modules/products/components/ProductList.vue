<template>
  <v-layout row wrap>
    <v-flex xs3 class="pa-2">
      <v-select
        v-model="storeId"
        :items="stores"
        :rules="[v => !!v || 'Item is required']"
        :label="$t('product.store')"
        item-text="name"
        item-value="id"
        required
      ></v-select>
      <v-select
        v-model="productCategoryId"
        :items="productCategories"
        :rules="[v => !!v || 'Item is required']"
        :label="$t('product.productCategory')"
        item-text="name"
        item-value="id"
        required
      ></v-select>
    </v-flex>
    <v-flex xs9 class="pa-2">
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
            <v-list-tile-sub-title>{{ product.code }} - {{ product.price | currency }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-avatar v-if="product.avatar">
            <img :src="product.avatar">
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ProductList',
    data () {
      return {
        storeId: null,
        productCategoryId: null,
        stores: [],
        productCategories: [],
        products: []
      }
    },
    watch: {
      storeId (value) {
        this.setProductParam({
          param: 'filter[where][storeId]',
          value: value
        });

        this.getProducts();
      },
      productCategoryId (value) {
        this.setProductParam({
          param: 'filter[where][productCategoryId]',
          value: value
        });

        this.getProducts();
      }
    },
    computed: {
      ...mapGetters([
        'getProductParams',
        'getProductParam'
      ])
    },
    created () {
      let storeId = this.getProductParam('filter[where][storeId]');
      let productCategoryId = this.getProductParam('filter[where][productCategoryId]');

      if (storeId) {
        this.storeId = parseInt(storeId);
      }

      if (productCategoryId) {
        this.productCategoryId = parseInt(productCategoryId);
      }

      this.getStores();
      this.getProductCategories();
    },
    methods: {
      ...mapActions([
        'setProductParam'
      ]),
      getStores () {
        let self = this;

        this.$axios.get('/stores')
        .then(function (response) {
          self.stores = response.data;
        })
        .catch(function (error) {
          self.stores = [];
        });
      },
      getProductCategories () {
        let self = this;

        this.$axios.get('/product_categories')
        .then(function (response) {
          self.productCategories = response.data;
        })
        .catch(function (error) {
          self.productCategories = [];
        });
      },
      getProducts () {
        let self = this;

        this.$axios.get('/products', {
          params: this.getProductParams
        })
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
