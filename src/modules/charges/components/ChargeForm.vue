<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="charge.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('charge.name')"
      required
    ></v-text-field>
    <v-text-field
      v-model="charge.code"
      :rules="rules.code"
      :counter="10"
      :label="$t('charge.code')"
      required
    ></v-text-field>
    <v-text-field
      v-model="charge.amount"
      :label="$t('charge.amount')"
      required
    ></v-text-field>
    <v-select
      v-model="charge.storeId"
      :items="stores"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('charge.store')"
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
    name: 'ChargeForm',
    data () {
      return {
        valid: true,
        stores: [],
        charge: {
          name: null,
          code: null,
          amount: 0.00,
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
      'chargeId'
    ],
    created () {
      let chargeId = this.getChargeId();

      this.getStores();
      if (chargeId) {
        this.getCharge(chargeId);
      }
    },
    methods: {
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
          self.$toasted.success(self.$t('toast.success.create'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
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
          self.$toasted.success(self.$t('toast.success.update'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
        });
      },
      submit () {
        let chargeId = this.getChargeId();

        if (this.$refs.form.validate()) {
          if (chargeId) {
            this.updateCharge(chargeId);
          } else {
            this.createCharge();
          }
        } else {
          this.valid = false;
        }
      },
      editCharge: function (chargeId) {
        this.$router.push({ path: `/charges/${chargeId}` });
      }
    }
  };
</script>
