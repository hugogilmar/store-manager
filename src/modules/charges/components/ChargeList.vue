<template>
  <v-layout row wrap>
    <v-flex xs3 class="pa-2">
      <v-select
        v-model="storeId"
        :items="stores"
        :rules="[v => !!v || 'Item is required']"
        :label="$t('product.store')"
        item-text="name"
        item-value="id"
        required
      ></v-select>
    </v-flex>
    <v-flex xs9 class="pa-2">
      <v-list two-line>
        <v-alert
          :value="true"
          type="info"
          v-if="charges.length == 0"
        >
          {{ $t('alert.empty') }}
        </v-alert>
        <v-list-tile
          v-for="charge in charges"
          :key="charge.id"
          avatar
          @click="editCharge(charge.id)"
        >
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ charge.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ charge.code }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-avatar v-if="charge.avatar">
            <img :src="charge.avatar">
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'ChargeList',
    data () {
      return {
        storeId: null,
        stores: [],
        charges: [],
        params: new URLSearchParams()
      }
    },
    watch: {
      storeId (value) {
        this.params.set('filter[where][storeId]', value);
        this.getCharges();
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
      getCharges () {
        let self = this;

        this.$axios.get('/charges', {
          params: this.params
        })
        .then(function (response) {
          self.charges = response.data;
        })
        .catch(function (error) {
          self.charges = [];
        });
      },
      editCharge: function (productCategoryId) {
        this.$router.push({ path: `/charges/${productCategoryId}` });
      }
    }
  };
</script>
