<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="location.name"
      v-validate="'required|max:48'"
      data-vv-name="name"
      :data-vv-as="$t('location.name').toLowerCase()"
      :counter="48"
      :label="$t('location.name')"
      :error-messages="errors.first('name')"
    ></v-text-field>
    <v-text-field
      v-model="location.code"
      v-validate="'required|max:10'"
      data-vv-name="code"
      :data-vv-as="$t('location.code').toLowerCase()"
      :counter="10"
      :label="$t('location.code')"
      :error-messages="errors.first('code')"
    ></v-text-field>
    <v-select
      v-model="location.storeId"
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
      color="primary"
      :disabled="!valid"
      @click="submit"
    >
      {{ $t('label.save') }}
    </v-btn>
  </v-form>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'LocationForm',
    data () {
      return {
        valid: true,
        stores: [],
        location: {
          name: null,
          code: null,
          storeId: null
        }
      }
    },
    props: [
      'locationId'
    ],
    created () {
      let locationId = this.getLocationId();

      this.getStores();
      if (locationId) {
        this.getLocation(locationId);
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      getLocationId () {
        return this.locationId;
      },
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
      getLocation (locationId) {
        let self = this;

        this.$axios.get(`/locations/${locationId}`)
        .then(function (response) {
          self.location = response.data;
        })
        .catch(function (error) {
          self.location = {};
        });
      },
      createLocation () {
        let self = this;

        this.$axios.post('/locations', {
          name: this.location.name,
          code: this.location.code,
          storeId: this.location.storeId
        })
        .then(function (response) {
          self.location = response.data;
          self.editLocation(self.location.id);
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.create')
          });
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.create')
          });
        });
      },
      updateLocation (locationId) {
        let self = this;

        this.$axios.put(`/locations/${locationId}`, {
          name: this.location.name,
          code: this.location.code,
          storeId: this.location.storeId
        })
        .then(function (response) {
          self.location = response.data;
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.update')
          });
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.update')
          });
        });
      },
      submit () {
        let self = this;
        let locationId = this.getLocationId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (locationId) {
              self.updateLocation(locationId);
            } else {
              self.createLocation();
            }
          }
        });
      },
      editLocation: function (locationId) {
        this.$router.push({ path: `/locations/${locationId}` });
      }
    }
  };
</script>
