<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="employee.name"
      v-validate="'required|max:48'"
      data-vv-name="name"
      :data-vv-as="$t('employee.name').toLowerCase()"
      :counter="48"
      :label="$t('employee.name')"
      :error-messages="errors.first('name')"
    ></v-text-field>
    <v-text-field
      v-model="employee.code"
      v-validate="'required|max:10'"
      data-vv-name="code"
      :data-vv-as="$t('employee.code').toLowerCase()"
      :counter="10"
      :label="$t('employee.code')"
      :error-messages="errors.first('code')"
    ></v-text-field>
    <v-select
      v-model="employee.storeId"
      v-validate="'required'"
      data-vv-name="storeId"
      item-text="name"
      item-value="id"
      :data-vv-as="$t('employee.store').toLowerCase()"
      :items="stores"
      :label="$t('employee.store')"
      :error-messages="errors.first('storeId')"
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
  import { mapActions } from 'vuex';

  export default {
    name: 'EmployeeForm',
    data () {
      return {
        valid: true,
        stores: [],
        employee: {
          name: null,
          code: null,
          storeId: null
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
      ...mapActions([
        'displaySnackbar'
      ]),
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
      updateEmployee (employeeId) {
        let self = this;

        this.$axios.put(`/employees/${employeeId}`, {
          name: this.employee.name,
          code: this.employee.code,
          storeId: this.employee.storeId
        })
        .then(function (response) {
          self.employee = response.data;
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
        let employeeId = this.getEmployeeId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (employeeId) {
              self.updateEmployee(employeeId);
            } else {
              self.createEmployee();
            }
          }
        });
      },
      editEmployee: function (employeeId) {
        this.$router.push({ path: `/employees/${employeeId}` });
      }
    }
  };
</script>
