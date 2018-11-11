<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="employee.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('employee.name')"
      required
    ></v-text-field>
    <v-text-field
      v-model="employee.code"
      :rules="rules.code"
      :counter="10"
      :label="$t('employee.code')"
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
          name: null,
          code: null,
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
      'employeeId'
    ],
    created () {
      let employeeId = this.getEmployeeId();

      this.getStores();
      if (employeeId) {
        this.getEmployee(employeeId);
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
      getEmployee (employeeId) {
        let self = this;

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
          code: this.employee.code,
          storeId: this.employee.storeId
        })
        .then(function (response) {
          self.employee = response.data;
          self.editEmployee(self.employee.id);
          self.$toasted.success(self.$t('toast.success.create'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
        });
      },
      updateEmployee (employeeId) {
        let self = this;

        this.$axios.put(`/employees/${employeeId}`, {
          name: this.employee.name,
          code: this.employee.code,
          storeId: this.employee.storeId
        })
        .then(function (response) {
          self.employee = response.data;
          self.$toasted.success(self.$t('toast.success.update'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
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
      editEmployee: function (employeeId) {
        this.$router.push({ path: `/employees/${employeeId}` });
      }
    }
  };
</script>
