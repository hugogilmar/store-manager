<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.paymentMethod', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <new-payment-method-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import NewPaymentMethodForm from '../components/NewPaymentMethodForm.vue';

  export default {
    components: {
      'new-payment-method-form': NewPaymentMethodForm
    }
  }
</script>
