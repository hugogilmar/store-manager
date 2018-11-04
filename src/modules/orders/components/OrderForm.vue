<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="order.number"
      :label="$t('order.number')"
      required
    ></v-text-field>
    <v-text-field
      v-model="order.location"
      :label="$t('order.location')"
      required
    ></v-text-field>
    <v-text-field
      v-model="order.guests"
      :label="$t('order.guests')"
      required
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
        slot="activator"
        v-model="order.date"
        :label="$t('order.date')"
        readonly
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
      :items="stores"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('order.store')"
      item-text="name"
      item-value="id"
      required
    ></v-select>
    <v-select
      v-model="order.employeeId"
      :items="employees"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('order.employee')"
      item-text="name"
      item-value="id"
      required
      v-if="employees.length > 0"
    ></v-select>
    <v-checkbox
      :label="$t('order.billable')"
      v-model="order.billable"
    ></v-checkbox>
    <v-text-field
      v-model="order.discountAmount"
      :label="$t('order.discountAmount')"
      required
    ></v-text-field>
    <v-text-field
      v-model="order.comment"
      :counter="48"
      :label="$t('order.comment')"
      required
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
  import moment from 'moment';

  export default {
    name: 'OrderForm',
    data () {
      return {
        valid: true,
        menu: false,
        stores: [],
        employees: []
      }
    },
    props: [
      'order'
    ],
    created () {
      this.getStores();
    },
    computed: {
      storeId() {
        return this.order.storeId;
      }
    },
    watch: {
      storeId() {
        this.getEmployees(this.storeId);
      }
    },
    methods: {
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
      createOrder () {
        let self = this;

        this.$axios.post('/orders', {
          number: this.order.number,
          date: this.order.date,
          storeId: this.order.storeId,
          employeeId: this.order.employeeId,
          status: this.order.status,
          location: this.order.location,
          guests: this.order.guests,
          comment: this.order.comment,
          discountAmount: this.order.discountAmount,
          billable: this.order.billable
        })
        .then(function (response) {
          self.$emit('order-created', response.data);
          self.$toasted.success(self.$t('toast.success.create'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
        });
      },
      updateOrder (orderId) {
        let self = this;

        this.$axios.put(`/orders/${orderId}`, {
          number: this.order.number,
          date: this.order.date,
          storeId: this.order.storeId,
          employeeId: this.order.employeeId,
          status: this.order.status,
          location: this.order.location,
          guests: this.order.guests,
          comment: this.order.comment,
          discountAmount: this.order.discountAmount,
          billable: this.order.billable
        })
        .then(function (response) {
          self.$emit('order-updated', response.data);
          self.$toasted.success(self.$t('toast.success.update'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
        });
      },
      submit () {
        let orderId = this.getOrderId();

        if (this.$refs.form.validate()) {
          if (orderId) {
            this.updateOrder(orderId);
          } else {
            this.createOrder();
          }
        } else {
          this.valid = false;
        }
      }
    }
  };
</script>
