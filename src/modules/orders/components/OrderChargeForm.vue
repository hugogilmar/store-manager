<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-select
      v-model="orderCharge.chargeId"
      :items="charges"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('orderCharge.charge')"
      item-text="name"
      item-value="id"
      required
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
  export default {
    name: 'OrderChargeForm',
    data () {
      return {
        valid: true,
        orderCharge: {
          charge: {
            id: 0
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
    computed: {
      chargeId () {
        return this.orderCharge.charge.id;
      }
    },
    watch: {
      chargeId: function (value) {
        this.orderCharge.chargeId = value;
      },
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
      chargeText (charge) {
        return charge.code + ' ' + charge.name;
      },
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
          chargeId: 0,
          amount: 0.00,
          charge: {
            id: 0,
            code: '',
            name: '',
            amount: 0.00
          }
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
          self.$toasted.success(self.$t('toast.success.create'));
          self.resetOrderCharge();
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
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
          self.$toasted.success(self.$t('toast.success.update'));
          self.resetOrderCharge();
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
        });
      },
      submit () {
        let orderChargeId = this.orderChargeId;

        if (this.$refs.form.validate()) {
          if (orderChargeId) {
            this.updateOrderCharge(orderChargeId);
          } else {
            this.createOrderCharge();
          }
        } else {
          this.valid = false;
        }
      },
      cancel () {
        this.$emit('cancel');
        this.resetOrderCharge();
      }
    }
  };
</script>
