<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.edit', { entity: $tc('entities.store', 1) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <store-form :store-id="storeId" />
      </v-slide-y-transition>
      <store-delete-dialog :store-id="storeId" />
    </v-container>
  </v-card>
</template>

<script>
  import StoreForm from '../components/StoreForm.vue';
  import StoreDeleteDialog from '../components/StoreDeleteDialog.vue';

  export default {
    components: {
      'store-form': StoreForm,
      'store-delete-dialog': StoreDeleteDialog
    },
    computed: {
      storeId () {
        return this.$route.params.id;
      }
    }
  }
</script>
