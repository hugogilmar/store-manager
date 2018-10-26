<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.list', { entity: $tc('entities.order', 2) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <order-list />
      </v-slide-y-transition>
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fab
          fixed
          bottom
          right
          @click="newOrder()"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </v-card>
</template>

<script>
  import OrderList from '../components/OrderList.vue';

  export default {
    components: {
      'order-list': OrderList
    },
    methods: {
      newOrder: function () {
        this.$router.push({ path: '/orders/new' });
      }
    }
  }
</script>
