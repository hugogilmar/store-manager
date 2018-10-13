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
    <v-btn
      @click="clear"
    >
      {{ $t('label.clear') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    name: 'NewProductForm',
    data () {
      return {
        valid: true,
        product_categories: [],
        stores: [],
        product: {
          name: '',
          code: '',
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
    created () {
      this.getProductCategories();
      this.getStores();
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
      submit () {
        let self = this;

        if (this.$refs.form.validate()) {
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
          })
          .catch(function (error) {
            self.valid = false;
          });
        } else {
          this.valid = false;
        }
      },
      clear () {
        this.$refs.form.reset();
      }
    }
  };
</script>

<style></script>
