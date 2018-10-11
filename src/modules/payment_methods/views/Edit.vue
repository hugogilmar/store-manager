<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.paymentMethod', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <payment-method-form />
      </v-slide-y-transition>
      <payment-method-delete-dialog />
    </v-container>
  </v-card>
</template>

<script>
  import PaymentMethodForm from '../components/PaymentMethodForm.vue';
  import PaymentMethodDeleteDialog from '../components/PaymentMethodDeleteDialog.vue';

  export default {
    components: {
      'payment-method-form': PaymentMethodForm,
      'payment-method-delete-dialog': PaymentMethodDeleteDialog
    }
  }
</script>
