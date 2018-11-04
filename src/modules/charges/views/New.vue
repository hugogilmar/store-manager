<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.charge', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <charge-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import ChargeForm from '../components/ChargeForm.vue';

  export default {
    components: {
      'charge-form': ChargeForm
    }
  }
</script>
