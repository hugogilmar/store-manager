<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.order', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <order-steper :order-id="orderId" />
      </v-slide-y-transition>
      <order-delete-dialog :order-id="orderId" />
    </v-container>
  </v-card>
</template>

<script>
  import OrderSteper from '../components/OrderSteper.vue';
  import OrderDeleteDialog from '../components/OrderDeleteDialog.vue';

  export default {
    components: {
      'order-steper': OrderSteper,
      'order-delete-dialog': OrderDeleteDialog
    },
    computed: {
      orderId () {
        return this.$route.params.id;
      }
    }
  }
</script>
