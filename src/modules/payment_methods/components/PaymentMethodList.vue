<template>
  <v-list>
    <v-list-tile
      v-for="category in payment_methods"
      :key="category.id"
      avatar
      @click="editPaymentMethod(category.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title v-text="category.name"></v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-avatar v-if="category.avatar">
        <img :src="category.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'PaymentMethodList',
    data () {
      return {
        payment_methods: []
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
          self.payment_methods = response.data;
        })
        .catch(function (error) {
          self.payment_methods = [];
        });
      },
      editPaymentMethod: function (paymentMethodId) {
        this.$router.push({ path: `/payment_methods/${paymentMethodId}` });
      }
    }
  };
</script>
