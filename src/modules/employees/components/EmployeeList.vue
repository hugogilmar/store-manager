<template>
  <v-layout row wrap>
    <v-flex xs3 class="pa-2">
      <v-select
        v-model="storeId"
        :items="stores"
        :rules="[v => !!v || 'Item is required']"
        :label="$t('product.store')"
        item-text="name"
        item-value="id"
        required
      ></v-select>
    </v-flex>
    <v-flex xs9 class="pa-2">
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
          avatar
          @click="editEmployee(employee.id)"
        >
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ employee.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ employee.code }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-avatar v-if="employee.avatar">
            <img :src="employee.avatar">
          </v-list-tile-avatar>
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

        this.getEmployees();
      }
    },
    computed: {
      ...mapGetters([
        'getEmployeeParams',
        'getEmployeeParam'
      ])
    },
    created () {
      let storeId = this.getEmployeeParam('filter[where][storeId]');

      if (storeId) {
        this.storeId = parseInt(storeId);
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
        })
        .then(function (response) {
          self.employees = response.data;
        })
        .catch(function (error) {
          self.employees = [];
        });
      },
      editEmployee: function (employeeId) {
        this.$router.push({ path: `/employees/${employeeId}` });
      }
    }
  };
</script>
