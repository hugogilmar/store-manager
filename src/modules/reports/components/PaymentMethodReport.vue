<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-data-table
        hide-actions
        :headers="headers"
        :items="rows"
      >
        <template slot="no-data">
          <v-alert
            :value="true"
            type="info"
          >
            {{ $t('alert.empty') }}
          </v-alert>
        </template>
        <template slot="items" slot-scope="report">
          <tr>
            <td class="text-xs-center" width="100">{{ report.item.code }}</td>
            <td>{{ report.item.name }}</td>
            <td class="text-xs-center" width="160">{{ report.item.quantity }}</td>
            <td class="text-xs-right" width="160">{{ report.item.total | currency }}</td>
          </tr>
        </template>
        <template slot="footer">
          <tr>
            <td colspan="2" class="text-xs-right">{{ $t('report.total') }}</td>
            <td class="text-xs-center">{{ quantity }}</td>
            <td class="text-xs-right">{{ total | currency }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: this.$t('report.code'),
            align: 'center',
            sortable: false,
            value: 'code'
          },
          {
            text: this.$t('report.paymentMethod'),
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: this.$t('report.quantity'),
            align: 'center',
            sortable: false,
            value: 'quantity'
          },
          {
            text: this.$t('report.total'),
            align: 'right',
            sortable: false,
            value: 'total'
          }
        ]
      }
    },
    props: [
      'rows'
    ],
    computed: {
      quantity () {
        return this.rows.reduce(function (sum, row) {
          return sum += row.quantity
        }, 0);
      },
      total () {
        return this.rows.reduce(function (sum, row) {
          return sum += row.total
        }, 0);
      }
    }
  }
</script>

<style scoped>
  .v-datatable tfoot td {
    font-size: 13px;
    font-weight: 600;
  }
</style>
