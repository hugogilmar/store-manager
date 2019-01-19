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
          @click="editCharge(charge.id)"
        >
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ charge.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ charge.code }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ChargeList',
    data () {
      return {
        storeId: null,
        stores: [],
        charges: []
      }
    },
    watch: {
      storeId (value) {
        this.setChargeParam({
          param: 'filter[where][storeId]',
          value: value
        });

        this.getCharges();
      }
    },
    computed: {
      ...mapGetters([
        'getChargeParams',
        'getChargeParam',
        'getStoreId'
      ])
    },
    created () {
      let storeId = this.getChargeParam('filter[where][storeId]');

      if (storeId) {
        this.storeId = parseInt(storeId);
      } else {
        this.storeId = this.getStoreId;
      }

      this.getStores();
    },
    methods: {
      ...mapActions([
        'setChargeParam'
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
      getCharges () {
        let self = this;

        this.$axios.get('/charges', {
          params: this.getChargeParams
        })
        .then(function (response) {
          self.charges = response.data;
        })
        .catch(function (error) {
          self.charges = [];
        });
      },
      editCharge: function (chargeId) {
        this.$router.push({ path: `/charges/${chargeId}` });
      }
    }
  };
</script>
