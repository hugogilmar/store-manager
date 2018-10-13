<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.list', { entity: $tc('entities.employee', 2) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <employee-list />
      </v-slide-y-transition>
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fab
          fixed
          bottom
          right
          @click="newEmployee()"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </v-card>
</template>

<script>
  import EmployeeList from '../components/EmployeeList.vue';

  export default {
    components: {
      'employee-list': EmployeeList
    },
    methods: {
      newEmployee: function () {
        this.$router.push({ path: '/employees/new' });
      }
    }
  }
</script>
