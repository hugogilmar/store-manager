<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="location.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('location.name')"
      required
    ></v-text-field>
    <v-text-field
      v-model="location.code"
      :rules="rules.code"
      :counter="10"
      :label="$t('location.code')"
      required
    ></v-text-field>
    <v-select
      v-model="location.storeId"
      :items="stores"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('location.store')"
      item-text="name"
      item-value="id"
      required
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
  export default {
    name: 'LocationForm',
    data () {
      return {
        valid: true,
        stores: [],
        location: {
          name: null,
          code: null,
          storeId: 0
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ],
          code: [
            v => !!v || 'Code is required',
            v => (v && v.length <= 10) || 'Code must be less than 10 characters'
          ]
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
          self.$toasted.success(self.$t('toast.success.create'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
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
          self.$toasted.success(self.$t('toast.success.update'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
        });
      },
      submit () {
        let locationId = this.getLocationId();

        if (this.$refs.form.validate()) {
          if (locationId) {
            this.updateLocation(locationId);
          } else {
            this.createLocation();
          }
        } else {
          this.valid = false;
        }
      },
      editLocation: function (locationId) {
        this.$router.push({ path: `/locations/${locationId}` });
      }
    }
  };
</script>
