<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.employee', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <employee-form v-bind:employee-id="employeeId" />
      </v-slide-y-transition>
      <employee-delete-dialog />
    </v-container>
  </v-card>
</template>

<script>
  import EmployeeForm from '../components/EmployeeForm.vue';
  import EmployeeDeleteDialog from '../components/EmployeeDeleteDialog.vue';

  export default {
    components: {
      'employee-form': EmployeeForm,
      'employee-delete-dialog': EmployeeDeleteDialog
    },
    computed: {
      employeeId () {
        return this.$route.params.id;
      }
    }
  }
</script>
