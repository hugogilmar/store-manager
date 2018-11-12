<template>
  <v-list two-line>
    <v-alert
      :value="true"
      type="info"
      v-if="productCategories.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="productCategory in productCategories"
      :key="productCategory.id"
      avatar
      @click="editProductCategory(productCategory.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ productCategory.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ productCategory.code }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="productCategory.avatar">
        <img :src="productCategory.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'ProductCategoryList',
    data () {
      return {
        productCategories: []
      }
    },
    created () {
      this.getProductCategories();
    },
    methods: {
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
      editProductCategory: function (productCategoryId) {
        this.$router.push({ path: `/product_categories/${productCategoryId}` });
      }
    }
  };
</script>
