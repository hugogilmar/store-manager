<template>
  <v-layout row wrap>
    <v-flex xs2 class="pa-2">
      <v-form v-model="valid" lazy-validation>
        <v-select
          v-model="storeId"
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
          right
          color="primary"
          :disabled="!valid"
          @click="submit"
        >
          {{ $t('label.filter') }}
        </v-btn>
      </v-form>
    </v-flex>
    <v-flex xs10 class="pa-2">
      <v-list two-line>
        <v-alert
          :value="true"
          type="info"
          v-if="employees.length == 0"
        >
          {{ $t('alert.empty') }}
        </v-alert>
        <v-list-tile
          v-for="employee in employees"
          :key="employee.id"
          @click="editEmployee(employee.id)"
        >
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ employee.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ employee.code }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'EmployeeList',
    data () {
      return {
        valid: false,
        storeId: null,
        stores: [],
        employees: []
      }
    },
    watch: {
      storeId (value) {
        this.setEmployeeParam({
          param: 'filter[where][storeId]',
          value: value
        });

        this.submit();
      }
    },
    computed: {
      ...mapGetters([
        'getEmployeeParams',
        'getEmployeeParam',
        'getStoreId'
      ])
    },
    created () {
      let storeId = this.getEmployeeParam('filter[where][storeId]');

      if (storeId) {
        this.storeId = parseInt(storeId);
      } else {
        this.storeId = this.getStoreId;
      }

      this.getStores();
    },
    methods: {
      ...mapActions([
        'setEmployeeParam'
      ]),
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
      getEmployees () {
        let self = this;

        this.$axios.get('/employees', {
          params: this.getEmployeeParams
        }).then(function (response) {
          self.employees = response.data;
        }).catch(function (error) {
          self.employees = [];
        });
      },
      submit () {
        let self = this;

        this.$validator.validate().then(function (valid) {
          if (valid) {
            self.getEmployees();
          }
        });
      },
      editEmployee: function (employeeId) {
        this.$router.push({ path: `/employees/${employeeId}` });
      }
    }
  };
</script>
