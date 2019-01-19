<template>
  <v-card>
    <v-card-title
      class="headline"
    >
      {{ $t('dialog.delete.title', { entity: $tc('entities.invoice', 1) }) }}
    </v-card-title>
    <v-card-text>
      {{ $t('dialog.delete.message', { entity: $tc('entities.invoice', 1) }) }}
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
        @click="deleteInvoice"
      >
        {{ $t('label.confirm') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'InvoiceDeleteDialog',
  data () {
    return {
      dialog: false
    }
  },
  props: [
    'invoiceId'
  ],
  methods: {
    ...mapActions([
      'displaySnackbar'
    ]),
    getInvoiceId () {
      return this.invoiceId;
    },
    deleteInvoice () {
      let self = this;
      let invoiceId = this.getInvoiceId();

      this.$axios.delete(`/invoices/${invoiceId}`)
      .then(function (response) {
        self.dialog = false;
        self.displaySnackbar({
          color: 'success',
          message: self.$t('notification.success.delete')
        });
        self.$emit('invoice-deleted');
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
