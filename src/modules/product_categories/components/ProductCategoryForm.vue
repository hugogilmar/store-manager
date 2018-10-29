<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="productCategory.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('productCategory.name')"
      required
    ></v-text-field>
    <v-text-field
      v-model="productCategory.code"
      :rules="rules.code"
      :counter="10"
      :label="$t('productCategory.code')"
      required
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
  export default {
    name: 'ProductCategoryForm',
    data () {
      return {
        valid: true,
        productCategory: {
          name: ''
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ],
          code: [
            v => !!v || 'Code is required',
            v => (v && v.length <= 10) || 'Code must be less than 10 characters'
          ]
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
          self.$toasted.success(self.$t('toast.success.create'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
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
          self.$toasted.success(self.$t('toast.success.update'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
        });
      },
      submit () {
        let self = this;
        let productCategoryId = this.getProductCategoryId();

        if (this.$refs.form.validate()) {
          if (productCategoryId) {
            this.updateProductCategory(productCategoryId);
          } else {
            this.createProductCategory();
          }
        } else {
          this.valid = false;
        }
      },
      editProductCategory: function (productCategoryId) {
        this.$router.push({ path: `/product_categories/${productCategoryId}` });
      }
    }
  };
</script>
