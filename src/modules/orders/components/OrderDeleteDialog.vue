<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-btn
      color="error"
      slot="activator"
      dark
      fab
      bottom
      right
      fixed
    >
      <v-icon>delete</v-icon>
    </v-btn>
    <v-card>
      <v-card-title
        class="headline"
      >
        {{ $t('dialog.delete.title', { entity: $tc('entities.order', 1) }) }}
      </v-card-title>
      <v-card-text>
        {{ $t('dialog.delete.message', { entity: $tc('entities.order', 1) }) }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="dialog = false"
        >
          {{ $t('label.cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="deleteOrder"
        >
          {{ $t('label.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'OrderDeleteDialog',
  data () {
    return {
      dialog: false
    }
  },
  props: [
    'orderId'
  ],
  methods: {
    ...mapActions([
      'displaySnackbar'
    ]),
    getOrderId () {
      return this.orderId;
    },
    deleteOrder () {
      let self = this;
      let orderId = this.getOrderId();

      this.$axios.delete(`/orders/${orderId}`)
      .then(function (response) {
        self.dialog = false;
        self.orderList();
        self.displaySnackbar({
          color: 'success',
          message: self.$t('toast.success.delete')
        });
      })
      .catch(function (error) {
        self.dialog = false;
        self.displaySnackbar({
          color: 'error',
          message: self.$t('toast.failure.delete')
        });
      });
    },
    orderList () {
      this.$router.push({ path: '/orders' });
    }
  }
};
</script>
