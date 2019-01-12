<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="product.name"
      v-validate="'required|max:48'"
      data-vv-name="name"
      :data-vv-as="$t('product.name').toLowerCase()"
      :counter="48"
      :label="$t('product.name')"
      :error-messages="errors.first('name')"
    ></v-text-field>
    <v-text-field
      v-model="product.code"
      v-validate="'required|max:10'"
      data-vv-name="code"
      :data-vv-as="$t('product.code').toLowerCase()"
      :counter="10"
      :label="$t('product.code')"
      :error-messages="errors.first('code')"
    ></v-text-field>
    <v-text-field
      v-model="product.price"
      v-validate="'required|decimal:2|min_value:0'"
      data-vv-name="price"
      :data-vv-as="$t('product.price').toLowerCase()"
      :label="$t('product.price')"
      :error-messages="errors.first('price')"
    ></v-text-field>
    <v-text-field
      v-model="product.specialPrice"
      v-validate="'required|decimal:2|min_value:0'"
      data-vv-name="specialPrice"
      :data-vv-as="$t('product.specialPrice').toLowerCase()"
      :label="$t('product.specialPrice')"
      :error-messages="errors.first('specialPrice')"
    ></v-text-field>
    <v-select
      v-model="product.productCategoryId"
      v-validate="'required'"
      data-vv-name="productCategoryId"
      item-text="name"
      item-value="id"
      :data-vv-as="$t('product.productCategory').toLowerCase()"
      :items="product_categories"
      :label="$t('product.productCategory')"
      :error-messages="errors.first('productCategoryId')"
    ></v-select>
    <v-select
      v-model="product.storeId"
      v-validate="'required'"
      data-vv-name="storeId"
      item-text="name"
      item-value="id"
      :data-vv-as="$t('product.store').toLowerCase()"
      :items="stores"
      :label="$t('product.store')"
      :error-messages="errors.first('storeId')"
    ></v-select>
    <v-btn
      color="primary"
      :disabled="!valid"
      @click="submit"
    >
      {{ $t('label.save') }}
    </v-btn>
  </v-form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ProductForm',
    data () {
      return {
        valid: true,
        product_categories: [],
        stores: [],
        product: {
          name: null,
          code: null,
          price: null,
          specialPrice: null,
          productCategoryId: null,
          storeId: null
        }
      }
    },
    props: [
      'productId'
    ],
    computed: {
      ...mapGetters([
        'getStoreId'
      ])
    },
    created () {
      let productId = this.getProductId();

      this.getProductCategories();
      this.getStores();

      if (productId) {
        this.getProduct(productId);
      } else {
        this.product.storeId = this.getStoreId;
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      getProductId () {
        return this.productId;
      },
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
      getProduct (productId) {
        let self = this;

        this.$axios.get(`/products/${productId}`)
        .then(function (response) {
          self.product = response.data;
        })
        .catch(function (error) {
          self.product = {};
        });
      },
      createProduct () {
        let self = this;

        this.$axios.post('/products', {
          name: this.product.name,
          code: this.product.code,
          price: this.product.price,
          specialPrice: this.product.specialPrice,
          productCategoryId: this.product.productCategoryId,
          storeId: this.product.storeId
        })
        .then(function (response) {
          self.product = response.data;
          self.editProduct(self.product.id);
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.create')
          });
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.create')
          });
        });
      },
      updateProduct (productId) {
        let self = this;

        this.$axios.put(`/products/${productId}`, {
          name: this.product.name,
          code: this.product.code,
          price: this.product.price,
          specialPrice: this.product.specialPrice,
          productCategoryId: this.product.productCategoryId,
          storeId: this.product.storeId
        })
        .then(function (response) {
          self.product = response.data;
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.update')
          });
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.update')
          });
        });
      },
      submit () {
        let self = this;
        let productId = this.getProductId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (productId) {
              self.updateProduct(productId);
            } else {
              self.createProduct();
            }
          }
        });
      },
      editProduct: function (productId) {
        this.$router.push({ path: `/products/${productId}` });
      }
    }
  };
</script>
