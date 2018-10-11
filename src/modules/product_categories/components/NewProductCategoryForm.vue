<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="product_category.name"
      :rules="rules.name"
      :counter="10"
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
    name: 'NewProductCategoryForm',
    data () {
      return {
        valid: true,
        product_category: {
          name: ''
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ]
        }
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$axios.post('/product_categories', {
            name: this.product_category.name
          })
          .then(function (response) {
            // todo
          })
          .catch(function (error) {
            // todo
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
