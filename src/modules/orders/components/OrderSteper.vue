<template>
  <v-layout
    row
    wrap
  >
    <v-flex xs5>
      <order-preview
        :order.sync="order"
        :order-lines.sync="orderLines"
        :invoices.sync="invoices"
      ></order-preview>
    </v-flex>
    <v-flex xs7>
      <v-stepper
        v-model="step"
        vertical
      >
        <v-stepper-step
          :editable="stepEditable(1)"
          step="1"
        >
          {{ $t('order.steps.one.title') }}
          <small>{{ $t('order.steps.one.summary') }}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <order-form
            :order.sync="order"
            @order-created="orderCreated"
            @order-updated="orderUpdated"
          />
        </v-stepper-content>

        <v-stepper-step
          :editable="stepEditable(2)"
          step="2"
        >
          {{ $t('order.steps.two.title') }}
          <small>{{ $t('order.steps.two.summary') }}</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <order-line-list
            :orderId.sync="orderId"
            :storeId.sync="storeId"
            :order-lines.sync="orderLines"
            @order-line-created="orderLineCreated"
            @order-line-updated="orderLineUpdated"
          />
          <v-fab-transition>
            <v-btn
              color="primary"
              dark
              fab
              fixed
              bottom
              right
              @click="newOrderLine()"
              v-if="step == 2"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-stepper-content>

        <v-stepper-step
          :editable="stepEditable(3)"
          step="3"
        >
          {{ $t('order.steps.three.title') }}
          <small>{{ $t('order.steps.three.summary') }}</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <order-charge-list
            :orderId.sync="orderId"
            :storeId.sync="storeId"
            :order-charges.sync="orderCharges"
            @order-charge-created="orderChargeCreated"
            @order-charge-updated="orderChargeUpdated"
          />
          <v-fab-transition>
            <v-btn
              color="primary"
              dark
              fab
              fixed
              bottom
              right
              @click="newOrderCharge()"
              v-if="step == 3"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-stepper-content>

        <v-stepper-step
          :editable="stepEditable(4)"
          step="4"
        >
          {{ $t('order.steps.four.title') }}
          <small>{{ $t('order.steps.four.summary') }}</small>
        </v-stepper-step>

        <v-stepper-content step="4">
          <invoice-list
            :orderId.sync="orderId"
            :balance.sync="balance"
            :invoices.sync="invoices"
            @invoice-created="invoiceCreated"
            @invoice-updated="invoiceUpdated"
          />
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
  import moment from 'moment';
  import OrderPreview from '../components/OrderPreview.vue';
  import OrderForm from '../components/OrderForm.vue';
  import OrderLineList from '../components/OrderLineList.vue';
  import OrderChargeList from '../components/OrderChargeList.vue';
  import InvoiceList from '../components/InvoiceList.vue';

  export default {
    name: 'OrderSteper',
    components: {
      'order-preview': OrderPreview,
      'order-form': OrderForm,
      'order-line-list': OrderLineList,
      'order-charge-list': OrderChargeList,
      'invoice-list': InvoiceList
    },
    data () {
      return {
        step: 1,
        order: {
          storeId: null,
          employeeId: null,
          number: null,
          date: null,
          location: null,
          guests: null,
          comment: null,
          billable: true,
          discountAmount: 0,
          status: 0,
          total: 0.00,
          subtotal: 0.00,
          taxesTotal: 0.00,
          discountsTotal: 0.00,
          chargesTotal: 0.00,
          balance: 0.00
        },
        orderLines: [],
        orderCharges: [],
        invoices: []
      }
    },
    props: [
      'orderId'
    ],
    computed: {
      storeId () {
        return this.order.storeId;
      },
      balance () {
        return this.order.balance;
      }
    },
    created () {
      let orderId = this.orderId;

      if (orderId) {
        this.getOrder(orderId);
        this.getOrderLines(orderId);
        this.getOrderCharges(orderId);
        this.getInvoices(orderId);
      }
    },
    methods: {
      stepEditable (step) {
        switch (step) {
          case 1:
            return true;
            break;
          case 2:
            return !!this.orderId;
            break;
          case 3:
            return !!this.orderId;
            break;
          case 4:
            return !!this.orderId && !!this.order.total;
            break;
          default:
            return false;
            break;
        }
      },
      getOrder (orderId) {
        let self = this;

        this.$axios.get(`/orders/${orderId}`, {
          params: {
            filter: {
              include: [
                'store',
                'employee'
              ]
            }
          }
        })
        .then(function (response) {
          let date = moment(response.data.date);
          response.data.date = date.utc().format('YYYY-MM-DD');
          self.order = response.data;
        })
        .catch(function (error) {
          self.order = {};
        });
      },
      getOrderLines (orderId) {
        let self = this;

        this.$axios.get('/order_lines', {
          params: {
            filter: {
              where: {
                orderId: orderId
              },
              include: 'product'
            }
          }
        })
        .then(function (response) {
          self.orderLines = response.data;
        })
        .catch(function (error) {
          self.orderLines = [];
        });
      },
      getOrderCharges (orderId) {
        let self = this;

        this.$axios.get('/order_charges', {
          params: {
            filter: {
              where: {
                orderId: orderId
              },
              include: 'charge'
            }
          }
        })
        .then(function (response) {
          self.orderCharges = response.data;
        })
        .catch(function (error) {
          self.orderCharges = [];
        });
      },
      getInvoices (orderId) {
        let self = this;

        this.$axios.get('/invoices', {
          params: {
            filter: {
              where: {
                orderId: orderId
              },
              include: 'paymentMethod'
            }
          }
        })
        .then(function (response) {
          self.invoices = response.data;
        })
        .catch(function (error) {
          self.invoices = [];
        });
      },
      orderCreated (order) {
        this.editOrder(order.id);
      },
      orderUpdated (order) {
        this.getOrder(order.id);
      },
      orderLineCreated () {
        let orderId = this.orderId;
        this.getOrder(orderId);
        this.getOrderLines(orderId);
      },
      orderLineUpdated () {
        let orderId = this.orderId;
        this.getOrder(orderId);
        this.getOrderLines(orderId);
      },
      orderChargeCreated () {
        let orderId = this.orderId;
        this.getOrder(orderId);
        this.getOrderCharges(orderId);
      },
      orderChargeUpdated () {
        let orderId = this.orderId;
        this.getOrder(orderId);
        this.getOrderCharges(orderId);
      },
      invoiceCreated () {
        let orderId = this.orderId;
        this.getOrder(orderId);
        this.getInvoices(orderId);
      },
      invoiceUpdated () {
        let orderId = this.orderId;
        this.getOrder(orderId);
        this.getInvoices(orderId);
      },
      editOrder (orderId) {
        this.$router.push({ path: `/orders/${orderId}` });
      }
    }
  };
</script>
