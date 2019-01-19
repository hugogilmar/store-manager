<template>
  <v-form v-model="valid" lazy-validation>
    <v-card>
      <v-card-title
        class="headline"
      >
        {{ $t('dialog.add.title', { entity: $tc('entities.orderCharge', 1) }) }}
      </v-card-title>
      <v-card-text>
        {{ $t('dialog.add.message', { entity: $tc('entities.orderCharge', 1) }) }}
      </v-card-text>
      <v-card-text>
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
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="closeDialog"
        >
          {{ $t('label.cancel') }}
        </v-btn>
        <v-btn
          flat
          color="primary"
          :disabled="!valid"
          @click="submit"
        >
          {{ $t('label.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
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
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.create')
          });
          self.reset();
          self.$emit('order-charge-created');
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
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.update')
          });
          self.reset();
          self.$emit('order-charge-updated');
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
      reset () {
        this.resetOrderCharge();
        this.$validator.reset();
      },
      closeDialog () {
        this.reset();
        this.$emit('close-dialog');
      }
    }
  };
</script>
