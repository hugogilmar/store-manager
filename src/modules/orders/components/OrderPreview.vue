<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline">{{ $t('order.title', { number: order.number }) }}</h3>
    </v-card-title>
    <table class="v-table theme--light">
      <tbody>
        <td>
          <p class="mb-1" v-if="order.store">{{ order.store.name }}</p>
          <p>
            <small>{{ $t('order.store') }}</small>
          </p>
        </td>
        <td>
          <p class="mb-1" v-if="order.employee">{{ order.employee.name }}</p>
          <p>
            <small>{{ $t('order.employee') }}</small>
          </p>
        </td>
        <td>
          <p class="mb-1">{{ order.date }}</p>
          <p>
            <small>{{ $t('order.date') }}</small>
          </p>
        </td>
      </tbody>
    </table>
    <table class="v-table theme--light">
      <thead>
        <th width="60" class="text-xs-center">{{ $t('orderLine.quantity') }}</th>
        <th class="text-xs-left">{{ $t('orderLine.product') }}</th>
        <th width="120" class="text-xs-right">{{ $t('orderLine.price') }}</th>
        <th width="120" class="text-xs-right">{{ $t('orderLine.total') }}</th>
      </thead>
      <tbody>
        <tr v-for="orderLine in orderLines" :key="orderLine.id">
          <td class="text-xs-center">{{ orderLine.quantity }}</td>
          <td>{{ orderLine.product.name }}</td>
          <td class="text-xs-right">{{ orderLine.price | currency }}</td>
          <td class="text-xs-right">{{ orderLine.total | currency }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3" class="text-xs-right">{{ $t('order.subtotal') }}</th>
          <td class="text-xs-right">{{ order.subtotal | currency }}</td>
        </tr>
        <tr>
          <th colspan="3" class="text-xs-right">{{ $t('order.taxesTotal') }}</th>
          <td class="text-xs-right">{{ order.taxesTotal | currency }}</td>
        </tr>
        <tr>
          <th colspan="3" class="text-xs-right">{{ $t('order.discountsTotal') }}</th>
          <td class="text-xs-right">{{ order.discountsTotal | currency }}</td>
        </tr>
        <tr>
          <th colspan="3" class="text-xs-right">{{ $t('order.chargesTotal') }}</th>
          <td class="text-xs-right">{{ order.chargesTotal | currency }}</td>
        </tr>
        <tr>
          <th colspan="3" class="text-xs-right">{{ $t('order.total') }}</th>
          <td class="text-xs-right">{{ order.total | currency }}</td>
        </tr>
        <tr>
          <th colspan="3" class="text-xs-right">{{ $t('order.balance') }}</th>
          <td class="text-xs-right">{{ order.balance | currency }}</td>
        </tr>
      </tfoot>
    </table>
  </v-card>
</template>

<script>
  export default {
    name: 'OrderPreview',
    data () {
      return {}
    },
    props: [
      'order',
      'orderLines',
      'invoices'
    ]
  };
</script>

<style scoped>
  .v-table small {
    color: rgba(0, 0, 0, .54);
  }

  .v-table thead, .v-table tbody {
    border-bottom: 1px solid rgba(0, 0, 0, .12);
  }

  .v-table thead th {
    font-size: 13px;
    height: 48px
  }

  .v-table tfoot td, .v-table tfoot th {
    border: none;
    font-size: 13px;
    font-weight: 500;
    height: 48px
  }

  .v-table tfoot tr {
    border: none;
  }

  .v-table tfoot th {
    color: rgba(0,0,0,.54);
  }
</style>
