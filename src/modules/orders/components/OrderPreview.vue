<template>
  <v-card>
    <div id="report">
      <v-container grid-list-md>
        <h3 class="headline mb-4">{{ $t('order.title', { referenceNumber: order.referenceNumber }) }}</h3>
        <v-layout wrap>
          <v-flex xs3>
            <p class="mb-1" v-if="order.store">{{ order.store.name }}</p>
            <p>
              <small>{{ $t('order.store') }}</small>
            </p>
          </v-flex>
          <v-flex xs3>
            <p class="mb-1" v-if="order.location">{{ order.location.name }}</p>
            <p>
              <small>{{ $t('order.location') }}</small>
            </p>
          </v-flex>
          <v-flex xs3>
            <p class="mb-1" v-if="order.employee">{{ order.employee.name }}</p>
            <p>
              <small>{{ $t('order.employee') }}</small>
            </p>
          </v-flex>
          <v-flex xs3>
            <p class="mb-1">{{ order.date }}</p>
            <p>
              <small>{{ $t('order.date') }}</small>
            </p>
          </v-flex>
        </v-layout>
        <v-data-table
          hide-actions
          :headers="headers"
          :items="orderLines"
        >
          <template slot="no-data">
            <v-alert
              :value="true"
              type="info"
            >
              {{ $t('alert.empty') }}
            </v-alert>
          </template>
          <template slot="items" slot-scope="orderLine">
            <tr>
              <td class="text-xs-center" width="100">{{ orderLine.item.quantity }}</td>
              <td>{{ orderLine.item.product.name }}</td>
              <td class="text-xs-right" width="160">{{ orderLine.item.price | currency }}</td>
              <td class="text-xs-right" width="160">{{ orderLine.item.total | currency }}</td>
            </tr>
          </template>
          <template slot="footer">
            <tr>
              <td colspan="3" class="text-xs-right">{{ $t('order.subtotal') }}</td>
              <td class="text-xs-right">{{ order.subtotal | currency }}</td>
            </tr>
            <tr v-if="order.billable">
              <td colspan="3" class="text-xs-right">{{ $t('order.taxesTotal') }}</td>
              <td class="text-xs-right">{{ order.taxesTotal | currency }}</td>
            </tr>
            <tr v-if="order.billable">
              <td colspan="3" class="text-xs-right">{{ $t('order.discountsTotal') }}</td>
              <td class="text-xs-right">{{ order.discountsTotal | currency }}</td>
            </tr>
            <tr v-if="order.billable">
              <td colspan="3" class="text-xs-right">{{ $t('order.chargesTotal') }}</td>
              <td class="text-xs-right">{{ order.chargesTotal | currency }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-xs-right">{{ $t('order.total') }}</td>
              <td class="text-xs-right">{{ order.total | currency }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-xs-right">{{ $t('order.balance') }}</td>
              <td class="text-xs-right">{{ order.balance | currency }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </div>
    <v-fab-transition>
      <v-btn
        dark
        fab
        absolute
        top
        right
        color="primary"
        v-print="'#report'"
      >
        <v-icon>print</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>

<script>
  export default {
    name: 'OrderPreview',
    data () {
      return {
        headers: [
          {
            text: this.$t('orderLine.quantity'),
            align: 'center',
            sortable: false,
            value: 'quantity'
          },
          {
            text: this.$t('orderLine.product'),
            align: 'left',
            sortable: false,
            value: 'product.name'
          },
          {
            text: this.$t('orderLine.price'),
            align: 'center',
            sortable: false,
            value: 'price'
          },
          {
            text: this.$t('orderLine.total'),
            align: 'right',
            sortable: false,
            value: 'total'
          }
        ]
      }
    },
    computed: {
      total () {
        return this.orderLines.reduce(function (sum, orderLine) {
          return sum += orderLine.total
        }, 0);
      }
    },
    props: [
      'order',
      'orderLines',
      'invoices'
    ]
  };
</script>

<style scoped>
  .v-datatable tfoot td {
    font-size: 13px;
    font-weight: 600;
  }
</style>
