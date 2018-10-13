<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.new', { entity: $tc('entities.order', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <new-order-form />
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import NewOrderForm from '../components/NewOrderForm.vue';

  export default {
    components: {
      'new-order-form': NewOrderForm
    }
  }
</script>
