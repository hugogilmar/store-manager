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
      @click="selectStore(store.id)"
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
      <v-list-tile-action v-if="store.id == storeId">
        <v-icon>check</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'StoreSelect',
    data () {
      return {
        stores: []
      }
    },
    computed: {
      ...mapGetters([
        'storeId'
      ])
    },
    created () {
      this.getStores();
    },
    methods: {
      ...mapActions([
        'setStoreId'
      ]),
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
      selectStore: function (storeId) {
        this.setStoreId(storeId);
      }
    }
  };
</script>
