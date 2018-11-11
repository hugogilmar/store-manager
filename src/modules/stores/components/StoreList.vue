<template>
  <v-list>
    <v-alert
      :value="true"
      type="info"
      v-if="stores.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="store in stores"
      :key="store.id"
      avatar
      @click="editStore(store.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ store.name }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="store.avatar">
        <img :src="store.avatar">
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
