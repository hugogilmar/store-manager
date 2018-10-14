<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="employee.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('employee.name')"
      required
    ></v-text-field>
    <v-select
      v-model="employee.storeId"
      :items="stores"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('employee.store')"
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
    <v-btn
      @click="clear"
    >
      {{ $t('label.clear') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    name: 'EmployeeForm',
    data () {
      return {
        valid: true,
        stores: [],
        employee: {
          name: '',
          storeId: 0
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ]
        }
      }
    },
    props: [
      'employeeId'
    ],
    created () {
      this.getStores();
      if (this.getEmployeeId()) {
        this.getEmployee();
      }
    },
    methods: {
      getEmployeeId () {
        return this.employeeId;
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
      getEmployee () {
        let self = this;
        let employeeId = this.getEmployeeId();

        this.$axios.get(`/employees/${employeeId}`)
        .then(function (response) {
          self.employee = response.data;
        })
        .catch(function (error) {
          self.employee = {};
        });
      },
      createEmployee () {
        let self = this;

        this.$axios.post('/employees', {
          name: this.employee.name,
          storeId: this.employee.storeId
        })
        .then(function (response) {
          self.employee = response.data;
          self.editEmployee(self.employee.id);
        })
        .catch(function (error) {
          self.valid = false;
        });
      },
      updateEmployee (employeeId) {
        let self = this;

        this.$axios.put(`/employees/${employeeId}`, {
          name: this.employee.name,
          storeId: this.employee.storeId
        })
        .then(function (response) {
          self.employee = response.data;
        })
        .catch(function (error) {
          self.valid = false;
        });
      },
      submit () {
        let employeeId = this.getEmployeeId();

        if (this.$refs.form.validate()) {
          if (employeeId) {
            this.updateEmployee(employeeId);
          } else {
            this.createEmployee();
          }
        } else {
          this.valid = false;
        }
      },
      clear () {
        this.$refs.form.reset();
      },
      editEmployee: function (employeeId) {
        this.$router.push({ path: `/employees/${employeeId}` });
      }
    }
  };
</script>
