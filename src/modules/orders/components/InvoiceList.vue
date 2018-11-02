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
      avatar
      @click="editInvoice(invoice.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ invoice.paymentMethod.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ invoice.amount | currency }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="invoice.avatar">
        <img :src="invoice.avatar">
      </v-list-tile-avatar>
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
      <v-card>
        <v-card-title
          class="headline"
        >
          {{ $t('dialog.add.title', { entity: $tc('entities.invoice', 1) }) }}
        </v-card-title>
        <v-card-text>
          {{ $t('dialog.add.message', { entity: $tc('entities.invoice', 1) }) }}
        </v-card-text>
        <v-card-text>
          <invoice-form
            :order-id.sync="orderId"
            :invoice-id.sync="invoiceId"
            :balance.sync="balance"
            @invoice-created="invoiceCreated"
            @invoice-updated="invoiceUpdated"
            @cancel="cancel"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
  import InvoiceForm from './InvoiceForm.vue';

  export default {
    name: 'InvoiceList',
    components: {
      'invoice-form': InvoiceForm
    },
    data () {
      return {
        dialog: false,
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
        this.dialog = false;
        this.$emit('invoice-created');
      },
      invoiceUpdated () {
        this.dialog = false;
        this.$emit('invoice-updated');
      },
      editInvoice (invoiceId) {
        this.invoiceId = invoiceId;
        this.dialog = true;
      },
      cancel () {
        this.invoiceId = null;
        this.dialog = false;
      }
    }
  };
</script>
