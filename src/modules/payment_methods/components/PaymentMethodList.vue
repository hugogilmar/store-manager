<template>
  <v-list two-line>
    <v-alert
      :value="true"
      type="info"
      v-if="paymentMethods.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="paymentMethod in paymentMethods"
      :key="paymentMethod.id"
      avatar
      @click="editPaymentMethod(paymentMethod.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ paymentMethod.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ paymentMethod.code }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="paymentMethod.avatar">
        <img :src="paymentMethod.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'PaymentMethodList',
    data () {
      return {
        paymentMethods: []
      }
    },
    created () {
      this.getPaymentMethods();
    },
    methods: {
      getPaymentMethods () {
        let self = this;

        this.$axios.get('/payment_methods')
        .then(function (response) {
          self.paymentMethods = response.data;
        })
        .catch(function (error) {
          self.paymentMethods = [];
        });
      },
      editPaymentMethod: function (paymentMethodId) {
        this.$router.push({ path: `/payment_methods/${paymentMethodId}` });
      }
    }
  };
</script>
