<template>
  <v-list>
    <v-list-tile
      v-for="category in stores"
      :key="category.id"
      avatar
      @click="editStore(category.id)"
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
    name: 'StoreList',
    data () {
      return {
        stores: []
      }
    },
    created () {
      this.getStores();
    },
    methods: {
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
      editStore: function (productCategoryId) {
        this.$router.push({ path: `/stores/${productCategoryId}` });
      }
    }
  };
</script>
