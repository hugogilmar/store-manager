<template>
  <v-layout row wrap>
    <v-flex xs4 class="pa-4">
      <v-select
        v-model="storeId"
        :items="stores"
        :rules="[v => !!v || 'Item is required']"
        :label="$t('product.store')"
        item-text="name"
        item-value="id"
        required
      ></v-select>
      <v-menu
        ref="menu"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          :label="$t('order.date')"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="date"
          scrollable
          locale="es-MX"
          @input="menu = false"
        >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs8>
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
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'OrderList',
    data () {
      return {
        landscape: true,
        date: new Date().toISOString().substr(0, 10),
        orders: []
      }
    },
    watch: {
      date (value) {
        this.getOrders();
      }
    },
    created () {
      this.getOrders();
    },
    methods: {
      getOrders () {
        let self = this;

        this.$axios.get('/orders', {
          params: {
            filter: {
              where: {
                date: this.date
              }
            }
          }
        })
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
