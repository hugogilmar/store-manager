<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.employee', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <employee-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import EmployeeForm from '../components/EmployeeForm.vue';

  export default {
    components: {
      'employee-form': EmployeeForm
    }
  }
</script>
