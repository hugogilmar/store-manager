<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="invoice.referenceNumber"
      :label="$t('invoice.referenceNumber')"
      required
    ></v-text-field>
    <v-select
      v-model="invoice.paymentMethodId"
      :items="paymentMethods"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('invoice.paymentMethod')"
      item-text="name"
      item-value="id"
      required
    ></v-select>
    <v-text-field
      v-model="invoice.amount"
      :label="$t('invoice.amount')"
      required
    ></v-text-field>
    <v-btn
      flat
      @click="cancel"
    >
      {{ $t('label.cancel') }}
    </v-btn>
    <v-btn
      color="primary"
      :disabled="!valid"
      @click="submit"
    >
      {{ $t('label.save') }}
    </v-btn>
  </v-form>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'InvoiceForm',
    data () {
      return {
        valid: true,
        menu: false,
        invoice: {},
        paymentMethods: []
      }
    },
    props: [
      'orderId',
      'invoiceId'
    ],
    computed: {
      paymentMethodId () {
        return this.invoice.paymentMethodId;
      }
    },
    watch: {
      paymentMethodId: function (value) {
        this.invoice.paymentMethodId = value;
      },
      invoiceId () {
        let invoiceId = this.invoiceId;

        if (invoiceId) {
          this.getInvoice(this.invoiceId);
        } else {
          this.resetInvoice();
        }
      }
    },
    created () {
      let invoiceId = this.invoiceId;

      this.getPaymentMethods();

      if (invoiceId) {
        this.getInvoice(this.invoiceId);
      } else {
        this.resetInvoice();
      }
    },
    methods: {
      paymentMethodText (paymentMethod) {
        return paymentMethod.code + ' ' + paymentMethod.name;
      },
      getPaymentMethods () {
        let self = this;

        this.$axios.get('/payment_methods')
        .then(function (response) {
          self.paymentMethods = response.data;
        })
        .catch(function (error) {
          self.paymentMethods = [];
        });
      },
      resetInvoice () {
        this.invoice = {
          referenceNumber: '',
          paymentMethodId: 0,
          amount: 0.00
        }
      },
      getInvoice (invoiceId) {
        let self = this;

        this.$axios.get(`/invoices/${invoiceId}`, {
          params: {
            filter: {
              include: 'paymentMethod'
            }
          }
        })
        .then(function (response) {
          let date = moment(response.data.date);
          response.data.date = date.format('YYYY-MM-DD');
          self.invoice = response.data;
        })
        .catch(function (error) {
          self.invoice = {};
        });
      },
      createInvoice () {
        let self = this;

        this.$axios.post('/invoices', {
          referenceNumber: this.invoice.referenceNumber,
          amount: this.invoice.amount,
          orderId: this.orderId,
          paymentMethodId: this.invoice.paymentMethodId
        })
        .then(function (response) {
          self.$emit('invoice-created');
          self.$toasted.success(self.$t('toast.success.create'));
          self.resetInvoice();
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
        });
      },
      updateInvoice (invoiceId) {
        let self = this;

        this.$axios.put(`/invoices/${invoiceId}`, {
          referenceNumber: this.invoice.referenceNumber,
          amount: this.invoice.amount,
          orderId: this.orderId,
          paymentMethodId: this.invoice.paymentMethodId
        })
        .then(function (response) {
          self.$emit('invoice-updated');
          self.$toasted.success(self.$t('toast.success.update'));
          self.resetInvoice();
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
        });
      },
      submit () {
        let invoiceId = this.invoiceId;

        if (this.$refs.form.validate()) {
          if (invoiceId) {
            this.updateInvoice(invoiceId);
          } else {
            this.createInvoice();
          }
        } else {
          this.valid = false;
        }
      },
      cancel () {
        this.$emit('cancel');
        this.resetInvoice();
      }
    }
  };
</script>
