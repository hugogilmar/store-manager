<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.employee', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <new-employee-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import NewEmployeeForm from '../components/NewEmployeeForm.vue';

  export default {
    components: {
      'new-employee-form': NewEmployeeForm
    }
  }
</script>
