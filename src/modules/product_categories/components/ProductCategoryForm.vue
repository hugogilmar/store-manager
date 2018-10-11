<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="product_category.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('productCategory.name')"
      required
    ></v-text-field>
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
    name: 'ProductCategoryForm',
    data () {
      return {
        valid: true,
        product_category: {
          name: ''
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ]
        }
      }
    },
    created () {
      this.getProductCategory();
    },
    methods: {
      getProductCategory () {
        let self = this;
        let productCategoryId = this.$route.params.id;

        this.$axios.get(`/product_categories/${productCategoryId}`)
        .then(function (response) {
          self.product_category = response.data;
        })
        .catch(function (error) {
          self.product_category = {};
        });
      },
      submit () {
        let self = this;
        let productCategoryId = this.$route.params.id;

        if (this.$refs.form.validate()) {
          this.$axios.put(`/product_categories/${productCategoryId}`, {
            name: this.product_category.name
          })
          .then(function (response) {
            self.product_category = response.data;
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
