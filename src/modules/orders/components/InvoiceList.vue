<template>
  <v-list
    two-line
    class="mb-5"
    style="position: relative;"
  >
    <v-alert
      :value="true"
      type="info"
      v-if="invoices.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="invoice in invoices"
      :key="invoice.id"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ invoice.paymentMethod.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ invoice.amount | currency }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn
          icon
          ripple
          @click="editInvoice(invoice.id)"
        >
          <v-icon color="grey">edit</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-action>
        <v-btn
          icon
          ripple
          @click="deleteInvoice(invoice.id)"
        >
          <v-icon color="red">delete</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        color="primary"
        slot="activator"
        dark
        small
        fab
        bottom
        right
        absolute
      >
        <v-icon>add</v-icon>
      </v-btn>
      <invoice-form
        :order-id.sync="orderId"
        :invoice-id.sync="invoiceId"
        :balance.sync="balance"
        @invoice-created="invoiceCreated"
        @invoice-updated="invoiceUpdated"
        @close-dialog="closeDialog"
        v-if="formDialog"
      />
      <invoice-delete-dialog
        :invoice-id.sync="invoiceId"
        @invoice-deleted="invoiceDeleted"
        @close-dialog="closeDialog"
        v-if="deleteDialog"
      />
    </v-dialog>
  </v-list>
</template>

<script>
  import InvoiceForm from './InvoiceForm.vue';
  import InvoiceDeleteDialog from './InvoiceDeleteDialog.vue';

  export default {
    name: 'InvoiceList',
    components: {
      'invoice-form': InvoiceForm,
      'invoice-delete-dialog': InvoiceDeleteDialog
    },
    data () {
      return {
        dialog: false,
        formDialog: true,
        deleteDialog: false,
        invoiceId: null
      }
    },
    props: [
      'orderId',
      'balance',
      'invoices'
    ],
    methods: {
      invoiceCreated () {
        this.closeDialog();
        this.$emit('invoice-created');
      },
      invoiceUpdated () {
        this.closeDialog();
        this.$emit('invoice-updated');
      },
      invoiceDeleted () {
        this.closeDialog();
        this.$emit('invoice-deleted');
      },
      editInvoice (invoiceId) {
        this.invoiceId = invoiceId;
        this.formDialog = true;
        this.deleteDialog = false;
        this.dialog = true;
      },
      deleteInvoice (invoiceId) {
        this.invoiceId = invoiceId;
        this.formDialog = false;
        this.deleteDialog = true;
        this.dialog = true;
      },
      closeDialog () {
        this.invoiceId = null;
        this.formDialog = true;
        this.deleteDialog = false;
        this.dialog = false;
      }
    }
  };
</script>
