<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.list', { entity: $tc('entities.paymentMethod', 2) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <payment-method-list />
      </v-slide-y-transition>
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fab
          fixed
          bottom
          right
          @click="newPaymentMethod()"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </v-card>
</template>

<script>
  import PaymentMethodList from '../components/PaymentMethodList.vue';

  export default {
    components: {
      'payment-method-list': PaymentMethodList
    },
    methods: {
      newPaymentMethod: function () {
        this.$router.push({ path: '/payment_methods/new' });
      }
    }
  }
</script>
