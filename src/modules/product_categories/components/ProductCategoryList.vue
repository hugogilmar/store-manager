<template>
  <v-list>
    <v-list-tile
      v-for="category in product_categories"
      :key="category.id"
      avatar
      @click="editProductCategory(category.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title v-text="category.name"></v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-avatar v-if="category.avatar">
        <img :src="category.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'ProductCategoryList',
    data () {
      return {
        product_categories: []
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
          self.product_categories = response.data;
        })
        .catch(function (error) {
          self.product_categories = [];
        });
      },
      editProductCategory: function (productCategoryId) {
        this.$router.push({ path: `/product_categories/${productCategoryId}` });
      }
    }
  };
</script>
