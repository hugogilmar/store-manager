<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="productCategory.name"
      v-validate="'required|max:48'"
      data-vv-name="name"
      :data-vv-as="$t('productCategory.name').toLowerCase()"
      :counter="48"
      :label="$t('productCategory.name')"
      :error-messages="errors.first('name')"
    ></v-text-field>
    <v-text-field
      v-model="productCategory.code"
      v-validate="'required|max:10'"
      data-vv-name="code"
      :data-vv-as="$t('productCategory.code').toLowerCase()"
      :counter="10"
      :label="$t('productCategory.code')"
      :error-messages="errors.first('code')"
    ></v-text-field>
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
    name: 'ProductCategoryForm',
    data () {
      return {
        valid: true,
        productCategory: {
          name: null,
          code: null
        }
      }
    },
    props: [
      'productCategoryId'
    ],
    created () {
      let productCategoryId = this.getProductCategoryId();

      if (productCategoryId) {
        this.getProductCategory(productCategoryId);
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      getProductCategoryId () {
        return this.productCategoryId;
      },
      getProductCategory (productCategoryId) {
        let self = this;

        this.$axios.get(`/product_categories/${productCategoryId}`)
        .then(function (response) {
          self.productCategory = response.data;
        })
        .catch(function (error) {
          self.productCategory = {};
        });
      },
      createProductCategory () {
        let self = this;

        this.$axios.post('/product_categories', {
          name: this.productCategory.name,
          code: this.productCategory.code
        })
        .then(function (response) {
          self.productCategory = response.data;
          self.editProductCategory(self.productCategory.id);
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
      updateProductCategory (productCategoryId) {
        let self = this;

        this.$axios.put(`/product_categories/${productCategoryId}`, {
          name: this.productCategory.name,
          code: this.productCategory.code
        })
        .then(function (response) {
          self.productCategory = response.data;
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
        let productCategoryId = this.getProductCategoryId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (productCategoryId) {
              self.updateProductCategory(productCategoryId);
            } else {
              self.createProductCategory();
            }
          }
        });
      },
      editProductCategory: function (productCategoryId) {
        this.$router.push({ path: `/product_categories/${productCategoryId}` });
      }
    }
  };
</script>
