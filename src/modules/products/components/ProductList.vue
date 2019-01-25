<template>
  <v-layout row wrap>
    <v-flex xs3 class="pa-2">
      <v-form v-model="valid" lazy-validation>
        <v-select
        v-model="storeId"
        v-validate="'required'"
        data-vv-name="storeId"
        item-text="name"
        item-value="id"
        :data-vv-as="$t('product.store').toLowerCase()"
        :items="stores"
        :label="$t('product.store')"
        :error-messages="errors.first('storeId')"
        ></v-select>
        <v-select
          clearable
          v-model="productCategoryId"
          item-text="name"
          item-value="id"
          :items="productCategories"
          :label="$t('product.productCategory')"
        ></v-select>
        <v-btn
          right
          color="primary"
          :disabled="!valid"
          @click="submit"
        >
          {{ $t('label.filter') }}
        </v-btn>
      </v-form>
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
          @click="editProduct(product.id)"
        >
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ product.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ product.code }} - {{ product.price | currency }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <pagination
        :limit.sync="limit"
        :offset.sync="offset"
        :count.sync="productsCount"
        @paginate="paginate"
      />
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import _ from 'lodash';

  export default {
    name: 'ProductList',
    data () {
      return {
        valid: false,
        storeId: null,
        productCategoryId: null,
        stores: [],
        productCategories: [],
        products: [],
        productsCount: 0
      }
    },
    watch: {
      storeId (value) {
        const filters = [
          'filter[where][storeId]',
          'where[storeId]'
        ];

        let self = this;

        filters.forEach(function (filter) {
          self.setFilter(filter, value);
        });

        this.resetPagination();
        this.submit();
      },
      productCategoryId (value) {
        const filters = [
          'filter[where][productCategoryId]',
          'where[productCategoryId]'
        ];

        let self = this;

        filters.forEach(function (filter) {
          self.setFilter(filter, value);
        });

        this.resetPagination();
        this.submit();
      }
    },
    computed: {
      ...mapGetters([
        'getProductParams',
        'getProductParam',
        'getStoreId'
      ]),
      limit () {
        let limit = this.getProductParam('filter[limit]')

        return parseInt(limit)
      },
      offset () {
        let offset = this.getProductParam('filter[offset]')

        return parseInt(offset)
      }
    },
    created () {
      let storeId = this.getProductParam('filter[where][storeId]');
      let productCategoryId = this.getProductParam('filter[where][productCategoryId]');

      if (storeId) {
        this.storeId = parseInt(storeId);
      } else {
        this.storeId = this.getStoreId;
      }

      if (productCategoryId) {
        this.productCategoryId = parseInt(productCategoryId);
      }

      this.getStores();
      this.getProductCategories();
    },
    methods: {
      ...mapActions([
        'setProductParam',
        'deleteProductParam'
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
      getProductsCount () {
        let self = this;

        this.$axios.get('/products/count', {
          params: this.getProductParams
        })
        .then(function (response) {
          self.productsCount = response.data.count;
        })
        .catch(function (error) {
          self.productsCount = 0;
        });
      },
      getProducts () {
        let self = this;

        this.getProductsCount()

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
      submit () {
        let self = this;

        this.$validator.validate().then(function (valid) {
          if (valid) {
            self.resetPagination();
            self.getProducts();
          }
        });
      },
      paginate (pagination) {
        this.resetPagination(pagination.offset);
        this.submit();
      },
      setFilter (filter, value) {
        if (!_.isNil(value)) {
          this.setProductParam({
            param: filter,
            value: value
          });
        } else {
          this.deleteProductParam({
            param: filter
          });
        }
      },
      resetPagination (offset = 0) {
        this.setProductParam({
          param: 'filter[offset]',
          value: offset
        });
      },
      editProduct: function (productId) {
        this.$router.push({ path: `/products/${productId}` });
      }
    }
  };
</script>
