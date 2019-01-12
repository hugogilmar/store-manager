<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="order.referenceNumber"
      v-validate="'alpha_num|max:48'"
      data-vv-name="referenceNumber"
      :data-vv-as="$t('order.referenceNumber').toLowerCase()"
      :counter="48"
      :label="$t('order.referenceNumber')"
      :error-messages="errors.first('referenceNumber')"
    ></v-text-field>
    <v-text-field
      v-model="order.guests"
      v-validate="'required|numeric|min_value:1'"
      data-vv-name="guests"
      :data-vv-as="$t('order.guests').toLowerCase()"
      :label="$t('order.guests')"
      :error-messages="errors.first('guests')"
    ></v-text-field>
    <v-menu
      ref="menu"
      v-model="menu"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        readonly
        slot="activator"
        v-model="order.date"
        v-validate="'required'"
        data-vv-name="date"
        :data-vv-as="$t('order.date').toLowerCase()"
        :label="$t('order.date')"
        :error-messages="errors.first('date')"
      ></v-text-field>
      <v-date-picker
        v-model="order.date"
        scrollable
        locale="es-MX"
        @input="menu = false"
      >
      </v-date-picker>
    </v-menu>
    <v-select
      v-model="order.storeId"
      item-text="name"
      item-value="id"
      v-validate="'required'"
      data-vv-name="storeId"
      :data-vv-as="$t('order.store').toLowerCase()"
      :items="stores"
      :label="$t('order.store')"
      :error-messages="errors.first('storeId')"
    ></v-select>
    <v-select
      v-model="order.employeeId"
      item-text="name"
      item-value="id"
      v-validate="'required'"
      data-vv-name="employeeId"
      :data-vv-as="$t('order.employee').toLowerCase()"
      :items="employees"
      :label="$t('order.employee')"
      :error-messages="errors.first('employeeId')"
    ></v-select>
    <v-select
      v-model="order.locationId"
      item-text="name"
      item-value="id"
      v-validate="'required'"
      data-vv-name="locationId"
      :data-vv-as="$t('order.location').toLowerCase()"
      :items="locations"
      :label="$t('order.location')"
      :error-messages="errors.first('locationId')"
    ></v-select>
    <v-checkbox
      :label="$t('order.billable')"
      v-model="order.billable"
    ></v-checkbox>
    <v-text-field
      v-model="order.comment"
      v-validate="'max:48'"
      data-vv-name="comment"
      :data-vv-as="$t('order.comment').toLowerCase()"
      :counter="48"
      :label="$t('order.comment')"
      :error-messages="errors.first('comment')"
    ></v-text-field>
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
  import moment from 'moment';

  export default {
    name: 'OrderForm',
    data () {
      return {
        valid: true,
        menu: false,
        stores: [],
        employees: [],
        locations: []
      }
    },
    props: [
      'order'
    ],
    created () {
      this.getStores();

      if (this.storeId) {
        this.getEmployees(this.storeId);
        this.getLocations(this.storeId);
      }
    },
    computed: {
      storeId() {
        return this.order.storeId;
      }
    },
    watch: {
      storeId() {
        this.getEmployees(this.storeId);
        this.getLocations(this.storeId);
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      getOrderId () {
        return this.order.id;
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
      getEmployees (storeId) {
        let self = this;

        this.$axios.get('/employees', {
          params: {
            filter: {
              where: {
                storeId: storeId
              }
            }
          }
        })
        .then(function (response) {
          self.employees = response.data;
        })
        .catch(function (error) {
          self.employees = [];
        });
      },
      getLocations (storeId) {
        let self = this;

        this.$axios.get('/locations', {
          params: {
            filter: {
              where: {
                storeId: storeId
              }
            }
          }
        })
        .then(function (response) {
          self.locations = response.data;
        })
        .catch(function (error) {
          self.locations = [];
        });
      },
      createOrder () {
        let self = this;

        this.$axios.post('/orders', {
          referenceNumber: this.order.referenceNumber,
          date: this.order.date,
          storeId: this.order.storeId,
          employeeId: this.order.employeeId,
          locationId: this.order.locationId,
          status: this.order.status,
          location: this.order.location,
          guests: this.order.guests,
          comment: this.order.comment,
          billable: this.order.billable
        })
        .then(function (response) {
          self.$emit('order-created', response.data);
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
      updateOrder (orderId) {
        let self = this;

        this.$axios.patch(`/orders/${orderId}`, {
          referenceNumber: this.order.referenceNumber,
          date: this.order.date,
          storeId: this.order.storeId,
          employeeId: this.order.employeeId,
          locationId: this.order.locationId,
          status: this.order.status,
          location: this.order.location,
          guests: this.order.guests,
          comment: this.order.comment,
          billable: this.order.billable
        })
        .then(function (response) {
          self.$emit('order-updated', response.data);
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
        let orderId = this.getOrderId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (orderId) {
              self.updateOrder(orderId);
            } else {
              self.createOrder();
            }
          }
        });
      }
    }
  };
</script>
