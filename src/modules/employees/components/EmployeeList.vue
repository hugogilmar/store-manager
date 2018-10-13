<template>
  <v-list>
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
        <v-list-tile-title v-text="employee.name"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="employee.avatar">
        <img :src="employee.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'EmployeeList',
    data () {
      return {
        employees: []
      }
    },
    created () {
      this.getEmployees();
    },
    methods: {
      getEmployees () {
        let self = this;

        this.$axios.get('/employees')
        .then(function (response) {
          self.employees = response.data;
        })
        .catch(function (error) {
          self.employees = [];
        });
      },
      editEmployee: function (productCategoryId) {
        this.$router.push({ path: `/employees/${productCategoryId}` });
      }
    }
  };
</script>
