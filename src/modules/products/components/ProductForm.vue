<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="product.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('product.name')"
      required
    ></v-text-field>
    <v-text-field
      v-model="product.code"
      :rules="rules.code"
      :counter="10"
      :label="$t('product.code')"
      required
    ></v-text-field>
    <v-text-field
      v-model="product.price"
      :rules="rules.price"
      :label="$t('product.price')"
      required
    ></v-text-field>
    <v-text-field
      v-model="product.specialPrice"
      :rules="rules.specialPrice"
      :label="$t('product.specialPrice')"
      required
    ></v-text-field>
    <v-select
      v-model="product.productCategoryId"
      :items="product_categories"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('product.productCategory')"
      item-text="name"
      item-value="id"
      required
    ></v-select>
    <v-select
      v-model="product.storeId"
      :items="stores"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('product.store')"
      item-text="name"
      item-value="id"
      required
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
  import { mapActions } from 'vuex';

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
          price: 0.0,
          specialPrice: 0.0,
          productCategoryId: 0,
          storeId: 0
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ],
          code: [
            v => !!v || 'Code is required',
            v => (v && v.length <= 10) || 'Code must be less than 10 characters'
          ],
          price: [],
          specialPrice: []
        }
      }
    },
    props: [
      'productId'
    ],
    created () {
      let productId = this.getProductId();

      this.getProductCategories();
      this.getStores();

      if (productId) {
        this.getProduct(productId);
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

        if (this.$refs.form.validate()) {
          if (productId) {
            this.updateProduct(productId);
          } else {
            this.createProduct();
          }
        } else {
          this.valid = false;
        }
      },
      editProduct: function (productId) {
        this.$router.push({ path: `/products/${productId}` });
      }
    }
  };
</script>
