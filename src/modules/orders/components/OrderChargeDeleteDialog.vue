<template>
  <v-card>
    <v-card-title
      class="headline"
    >
      {{ $t('dialog.delete.title', { entity: $tc('entities.orderCharge', 1) }) }}
    </v-card-title>
    <v-card-text>
      {{ $t('dialog.delete.message', { entity: $tc('entities.orderCharge', 1) }) }}
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
        @click="deleteOrderCharge"
      >
        {{ $t('label.confirm') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'OrderChargeDeleteDialog',
  data () {
    return {
      dialog: false
    }
  },
  props: [
    'orderChargeId'
  ],
  methods: {
    ...mapActions([
      'displaySnackbar'
    ]),
    getOrderChargeId () {
      return this.orderChargeId;
    },
    deleteOrderCharge () {
      let self = this;
      let orderChargeId = this.getOrderChargeId();

      this.$axios.delete(`/order_charges/${orderChargeId}`)
      .then(function (response) {
        self.dialog = false;
        self.displaySnackbar({
          color: 'success',
          message: self.$t('notification.success.delete')
        });
        self.$emit('order-charge-deleted');
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
