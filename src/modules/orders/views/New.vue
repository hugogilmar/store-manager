<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.order', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <order-steper />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import OrderSteper from '../components/OrderSteper.vue';

  export default {
    components: {
      'order-steper': OrderSteper
    }
  }
</script>
