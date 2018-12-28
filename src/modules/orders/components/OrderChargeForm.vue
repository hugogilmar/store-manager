<template>
  <v-form v-model="valid" lazy-validation>
    <v-select
      v-model="orderCharge.chargeId"
      v-validate="'required'"
      data-vv-name="chargeId"
      item-text="name"
      item-value="id"
      :items="charges"
      :data-vv-as="$t('orderCharge.charge').toLowerCase()"
      :label="$t('orderCharge.charge')"
      :error-messages="errors.first('chargeId')"
    ></v-select>
    <v-btn
      flat
      @click="cancel"
    >
      {{ $t('label.cancel') }}
    </v-btn>
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
    name: 'OrderChargeForm',
    data () {
      return {
        valid: true,
        orderCharge: {
          chargeId: null,
          amount: null,
          charge: {
            id: null
          }
        },
        charges: []
      }
    },
    props: [
      'orderId',
      'storeId',
      'orderChargeId'
    ],
    watch: {
      storeId () {
        this.getCharges();
      },
      orderChargeId () {
        let orderChargeId = this.orderChargeId;

        if (orderChargeId) {
          this.getOrderCharge(this.orderChargeId);
        } else {
          this.resetOrderCharge();
        }
      }
    },
    created () {
      let orderChargeId = this.orderChargeId;

      this.getCharges();

      if (orderChargeId) {
        this.getOrderCharge(this.orderChargeId);
      } else {
        this.resetOrderCharge();
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      getCharges () {
        let self = this;
        let storeId = this.storeId;

        this.$axios.get('/charges', {
          params: {
            filter: {
              where: {
                storeId: storeId
              }
            }
          }
        })
        .then(function (response) {
          self.charges = response.data;
        })
        .catch(function (error) {
          self.charges = [];
        });
      },
      resetOrderCharge () {
        this.orderCharge = {
          chargeId: null,
          amount: null
        }
      },
      getOrderCharge (orderChargeId) {
        let self = this;

        this.$axios.get(`/order_charges/${orderChargeId}`, {
          params: {
            filter: {
              include: 'charge'
            }
          }
        })
        .then(function (response) {
          self.orderCharge = response.data;
        })
        .catch(function (error) {
          self.orderCharge = {};
        });
      },
      createOrderCharge () {
        let self = this;

        this.$axios.post('/order_charges', {
          orderId: this.orderId,
          chargeId: this.orderCharge.chargeId
        })
        .then(function (response) {
          self.$emit('order-charge-created');
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.create')
          });
          self.resetOrderCharge();
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.create')
          });
        });
      },
      updateOrderCharge (orderChargeId) {
        let self = this;

        this.$axios.put(`/order_charges/${orderChargeId}`, {
          orderId: this.orderId,
          chargeId: this.orderCharge.chargeId
        })
        .then(function (response) {
          self.$emit('order-charge-updated');
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.update')
          });
          self.resetOrderCharge();
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
        let orderChargeId = this.orderChargeId;

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (orderChargeId) {
              self.updateOrderCharge(orderChargeId);
            } else {
              self.createOrderCharge();
            }
          }
        });
      },
      cancel () {
        this.$emit('cancel');
        this.$validator.reset();
        this.resetOrderCharge();
      }
    }
  };
</script>
