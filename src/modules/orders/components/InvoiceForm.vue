<template>
  <v-form v-model="valid" lazy-validation>
    <v-card>
      <v-card-title
        class="headline"
      >
        {{ $t(dialogTitle, { entity: $tc('entities.invoice', 1) }) }}
      </v-card-title>
      <v-card-text>
        {{ $t(dialogMessage, { entity: $tc('entities.invoice', 1) }) }}
      </v-card-text>
      <v-card-text>
        <v-text-field
          v-model="invoice.referenceNumber"
          v-validate="'alpha_num|max:48'"
          data-vv-name="referenceNumber"
          :data-vv-as="$t('invoice.referenceNumber').toLowerCase()"
          :counter="48"
          :label="$t('invoice.referenceNumber')"
          :error-messages="errors.first('referenceNumber')"
        ></v-text-field>
        <v-select
          v-model="invoice.paymentMethodId"
          v-validate="'required'"
          data-vv-name="paymentMethodId"
          item-text="name"
          item-value="id"
          :items="paymentMethods"
          :data-vv-as="$t('invoice.paymentMethod').toLowerCase()"
          :label="$t('invoice.paymentMethod')"
          :error-messages="errors.first('paymentMethodId')"
        ></v-select>
        <v-text-field
          v-model="invoice.amount"
          v-validate="'required|decimal:2|min_value:1'"
          data-vv-name="amount"
          :data-vv-as="$t('invoice.amount').toLowerCase()"
          :label="$t('invoice.amount')"
          :error-messages="errors.first('amount')"
        ></v-text-field>
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
          flat
          color="primary"
          :disabled="!valid"
          @click="submit"
        >
          {{ $t('label.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import { mapActions } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'InvoiceForm',
    data () {
      return {
        valid: true,
        menu: false,
        invoice: {
          referenceNumber: null,
          paymentMethodId: null,
          amount: null
        },
        paymentMethods: []
      }
    },
    props: [
      'orderId',
      'invoiceId'
    ],
    computed: {
      dialogTitle () {
        return this.invoiceId ? 'dialog.edit.title' : 'dialog.add.title';
      },
      dialogMessage () {
        return this.invoiceId ? 'dialog.add.message' : 'dialog.add.message';
      }
    },
    watch: {
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
      ...mapActions([
        'displaySnackbar'
      ]),
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
          referenceNumber: null,
          paymentMethodId: null,
          amount: null
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
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.create')
          });
          self.reset();
          self.$emit('invoice-created');
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.create')
          });
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
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.update')
          });
          self.reset();
          self.$emit('invoice-updated');
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.update')
          });
        });
      },
      submit () {
        let self = this;
        let invoiceId = this.invoiceId;

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (invoiceId) {
              self.updateInvoice(invoiceId);
            } else {
              self.createInvoice();
            }
          }
        });
      },
      reset () {
        this.resetInvoice();
        this.$validator.reset();
      },
      closeDialog () {
        this.reset();
        this.$emit('close-dialog');
      }
    }
  };
</script>
