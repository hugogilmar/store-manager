<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.charge', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <charge-form :charge-id="chargeId" />
      </v-slide-y-transition>
      <charge-delete-dialog :charge-id="chargeId" />
    </v-container>
  </v-card>
</template>

<script>
  import ChargeForm from '../components/ChargeForm.vue';
  import ChargeDeleteDialog from '../components/ChargeDeleteDialog.vue';

  export default {
    components: {
      'charge-form': ChargeForm,
      'charge-delete-dialog': ChargeDeleteDialog
    },
    computed: {
      chargeId () {
        return this.$route.params.id;
      }
    }
  }
</script>
