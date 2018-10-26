<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.paymentMethod', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <payment-method-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import PaymentMethodForm from '../components/PaymentMethodForm.vue';

  export default {
    components: {
      'payment-method-form': PaymentMethodForm
    }
  }
</script>
