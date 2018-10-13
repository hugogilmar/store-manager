<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="order.number"
      :rules="rules.number"
      :counter="48"
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
    <v-btn
      @click="clear"
    >
      {{ $t('label.clear') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    name: 'NewOrderForm',
    data () {
      return {
        valid: true,
        menu: false,
        stores: [],
        employees: [],
        order: {
          number: '',
          date: '',
          storeId: 0,
          employeeId: 0
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ]
        }
      }
    },
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
      submit () {
        let self = this;

        if (this.$refs.form.validate()) {
          this.$axios.post('/orders', {
            number: this.order.number
          })
          .then(function (response) {
            self.order = response.data;
          })
          .catch(function (error) {
            self.valid = false;
          });
        } else {
          this.valid = false;
        }
      },
      clear () {
        this.$refs.form.reset();
      }
    }
  };
</script>
