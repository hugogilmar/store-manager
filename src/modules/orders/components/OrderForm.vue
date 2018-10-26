<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="order.number"
      :label="$t('order.number')"
      required
    ></v-text-field>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
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
        prepend-icon="event"
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
          status: this.order.status
        })
        .then(function (response) {
          self.$emit('order-created', response.data);
        })
        .catch(function (error) {
          self.valid = false;
        });
      },
      updateOrder (orderId) {
        let self = this;

        this.$axios.put(`/orders/${orderId}`, {
          number: this.order.number,
          date: this.order.date,
          storeId: this.order.storeId,
          employeeId: this.order.employeeId,
          status: this.order.status
        })
        .then(function (response) {
          self.$emit('order-updated', response.data);
        })
        .catch(function (error) {
          self.valid = false;
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
