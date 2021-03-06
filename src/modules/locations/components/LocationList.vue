<template>
  <v-layout row wrap>
    <v-flex xs3 class="pa-2">
      <v-form v-model="valid" lazy-validation>
        <v-select
          v-model="storeId"
          v-validate="'required'"
          data-vv-name="storeId"
          item-text="name"
          item-value="id"
          :data-vv-as="$t('location.store').toLowerCase()"
          :items="stores"
          :label="$t('location.store')"
          :error-messages="errors.first('storeId')"
        ></v-select>
        <v-btn
          right
          color="primary"
          :disabled="!valid"
          @click="submit"
        >
          {{ $t('label.filter') }}
        </v-btn>
      </v-form>
    </v-flex>
    <v-flex xs9 class="pa-2">
      <v-list two-line>
        <v-alert
          :value="true"
          type="info"
          v-if="locations.length == 0"
        >
          {{ $t('alert.empty') }}
        </v-alert>
        <v-list-tile
          v-for="location in locations"
          :key="location.id"
          @click="editLocation(location.id)"
        >
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ location.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ location.code }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'LocationList',
    data () {
      return {
        valid: false,
        storeId: null,
        stores: [],
        locations: []
      }
    },
    watch: {
      storeId (value) {
        this.setLocationParam({
          param: 'filter[where][storeId]',
          value: value
        });

        this.submit();
      }
    },
    computed: {
      ...mapGetters([
        'getLocationParams',
        'getLocationParam',
        'getStoreId'
      ])
    },
    created () {
      let storeId = this.getLocationParam('filter[where][storeId]');

      if (storeId) {
        this.storeId = parseInt(storeId);
      } else {
        this.storeId = this.getStoreId;
      }

      this.getStores();
    },
    methods: {
      ...mapActions([
        'setLocationParam'
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
      getLocations () {
        let self = this;

        this.$axios.get('/locations', {
          params: this.getLocationParams
        })
        .then(function (response) {
          self.locations = response.data;
        })
        .catch(function (error) {
          self.locations = [];
        });
      },
      submit () {
        let self = this;

        this.$validator.validate().then(function (valid) {
          if (valid) {
            self.getLocations();
          }
        });
      },
      editLocation: function (locationId) {
        this.$router.push({ path: `/locations/${locationId}` });
      }
    }
  };
</script>
