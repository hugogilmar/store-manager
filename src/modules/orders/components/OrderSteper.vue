<template>
  <v-container grid-list-lg>
    <v-layout
      row
      wrap
    >
      <v-flex xs5>
        <order-preview
          :order.sync="order"
          :order-lines.sync="orderLines"
          :invoices.sync="invoices"
        >
      </order-preview>
      </v-flex>
      <v-flex xs7>
        <v-stepper
          v-model="step"
          vertical
        >
          <v-stepper-step
            :editable="stepEditable(1)"
            :complete="stepCompleted(1)"
            step="1"
          >
            {{ $t('order.steps.one.title') }}
            <small>{{ $t('order.steps.one.summary') }}</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <order-form
              :order="order"
              @order-created="orderCreated"
              @order-updated="orderUpdated"
            />
          </v-stepper-content>

          <v-stepper-step
            :editable="stepEditable(2)"
            :complete="stepCompleted(2)"
            step="2"
          >
            {{ $t('order.steps.two.title') }}
            <small>{{ $t('order.steps.two.summary') }}</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <order-line-list
              :orderId="orderId"
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
            :complete="stepCompleted(3)"
            step="3"
          >
            {{ $t('order.steps.three.title') }}
            <small>{{ $t('order.steps.three.summary') }}</small>
          </v-stepper-step>

          <v-stepper-content step="3">
            <invoice-list
              :orderId="orderId"
              :invoices.sync="invoices"
              @invoice-created="invoiceCreated"
              @invoice-updated="invoiceUpdated"
            />
          </v-stepper-content>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import moment from 'moment';
  import OrderPreview from '../components/OrderPreview.vue';
  import OrderForm from '../components/OrderForm.vue';
  import OrderLineList from '../components/OrderLineList.vue';
  import InvoiceList from '../components/InvoiceList.vue';

  export default {
    name: 'OrderSteper',
    components: {
      'order-preview': OrderPreview,
      'order-form': OrderForm,
      'order-line-list': OrderLineList,
      'invoice-list': InvoiceList
    },
    data () {
      return {
        step: 1,
        order: {
          number: '',
          date: '',
          storeId: 0,
          employeeId: 0,
          status: 0
        },
        orderLines: [],
        invoices: []
      }
    },
    props: [
      'orderId'
    ],
    created () {
      let orderId = this.orderId;

      if (orderId) {
        this.getOrder(orderId);
        this.getOrderLines(orderId);
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
            return !!this.orderId && !!this.order.total;
            break;
          default:
            return false;
            break;
        }
      },
      stepCompleted (step) {
        switch (step) {
          case 1:
            return !!this.orderId;
            break;
          case 2:
            return !!this.orderLines.length;
            break;
          case 3:
            return !!this.invoices.length;
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
          response.data.date = date.format('YYYY-MM-DD');
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
