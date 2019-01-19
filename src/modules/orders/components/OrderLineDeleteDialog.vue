<template>
  <v-card>
    <v-card-title
      class="headline"
    >
      {{ $t('dialog.delete.title', { entity: $tc('entities.orderLine', 1) }) }}
    </v-card-title>
    <v-card-text>
      {{ $t('dialog.delete.message', { entity: $tc('entities.orderLine', 1) }) }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click="closeDialog"
      >
        {{ $t('label.cancel') }}
      </v-btn>
      <v-btn
        color="primary"
        flat
        @click="deleteOrderLine"
      >
        {{ $t('label.confirm') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'OrderLineDeleteDialog',
  data () {
    return {
      dialog: false
    }
  },
  props: [
    'orderLineId'
  ],
  methods: {
    ...mapActions([
      'displaySnackbar'
    ]),
    getOrderLineId () {
      return this.orderLineId;
    },
    deleteOrderLine () {
      let self = this;
      let orderLineId = this.getOrderLineId();

      this.$axios.delete(`/order_lines/${orderLineId}`)
      .then(function (response) {
        self.dialog = false;
        self.displaySnackbar({
          color: 'success',
          message: self.$t('notification.success.delete')
        });
        self.$emit('order-line-deleted');
      })
      .catch(function (error) {
        self.dialog = false;
        self.displaySnackbar({
          color: 'error',
          message: self.$t('notification.failure.delete')
        });
      });
    },
    closeDialog () {
      this.$emit('close-dialog');
    }
  }
};
</script>
