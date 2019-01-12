<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="charge.name"
      v-validate="'required|max:48'"
      data-vv-name="name"
      :data-vv-as="$t('charge.name').toLowerCase()"
      :counter="48"
      :label="$t('charge.name')"
      :error-messages="errors.first('name')"
    ></v-text-field>
    <v-text-field
      v-model="charge.code"
      v-validate="'required|max:10'"
      data-vv-name="code"
      :data-vv-as="$t('charge.code').toLowerCase()"
      :counter="10"
      :label="$t('charge.code')"
      :error-messages="errors.first('code')"
    ></v-text-field>
    <v-text-field
      v-model="charge.amount"
      v-validate="'required|numeric|min_value:1'"
      data-vv-name="amount"
      :data-vv-as="$t('charge.amount').toLowerCase()"
      :label="$t('charge.amount')"
      :error-messages="errors.first('amount')"
    ></v-text-field>
    <v-select
      v-model="charge.storeId"
      v-validate="'required'"
      data-vv-name="storeId"
      item-text="name"
      item-value="id"
      :data-vv-as="$t('charge.store').toLowerCase()"
      :items="stores"
      :label="$t('charge.store')"
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
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'ChargeForm',
    data () {
      return {
        valid: true,
        stores: [],
        charge: {
          name: null,
          code: null,
          amount: null,
          storeId: null
        }
      }
    },
    props: [
      'chargeId'
    ],
    computed: {
      ...mapGetters([
        'getStoreId'
      ])
    },
    created () {
      let chargeId = this.getChargeId();

      this.getStores();

      if (chargeId) {
        this.getCharge(chargeId);
      } else {
        this.charge.storeId = this.getStoreId;
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      getChargeId () {
        return this.chargeId;
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
      getCharge (chargeId) {
        let self = this;

        this.$axios.get(`/charges/${chargeId}`)
        .then(function (response) {
          self.charge = response.data;
        })
        .catch(function (error) {
          self.charge = {};
        });
      },
      createCharge () {
        let self = this;

        this.$axios.post('/charges', {
          name: this.charge.name,
          code: this.charge.code,
          amount: this.charge.amount,
          storeId: this.charge.storeId
        })
        .then(function (response) {
          self.charge = response.data;
          self.editCharge(self.charge.id);
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
      updateCharge (chargeId) {
        let self = this;

        this.$axios.put(`/charges/${chargeId}`, {
          name: this.charge.name,
          code: this.charge.code,
          amount: this.charge.amount,
          storeId: this.charge.storeId
        })
        .then(function (response) {
          self.charge = response.data;
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
        let chargeId = this.getChargeId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (chargeId) {
              self.updateCharge(chargeId);
            } else {
              self.createCharge();
            }
          }
        });
      },
      editCharge: function (chargeId) {
        this.$router.push({ path: `/charges/${chargeId}` });
      }
    }
  };
</script>
