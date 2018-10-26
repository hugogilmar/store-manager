<template>
  <v-list two-line>
    <v-alert
      :value="true"
      type="info"
      v-if="orders.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="order in orders"
      :key="order.id"
      avatar
      @click="editOrder(order.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ order.number }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ order.total | currency }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="order.avatar">
        <img :src="order.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'OrderList',
    data () {
      return {
        orders: []
      }
    },
    created () {
      this.getOrders();
    },
    methods: {
      getOrders () {
        let self = this;

        this.$axios.get('/orders')
        .then(function (response) {
          self.orders = response.data;
        })
        .catch(function (error) {
          self.orders = [];
        });
      },
      editOrder: function (orderId) {
        this.$router.push({ path: `/orders/${orderId}` });
      }
    }
  };
</script>
