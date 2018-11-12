storesstore<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('report.header.store') }}</v-subheader>
    <v-layout row wrap>
      <v-flex xs3 class="pa-4">
        <v-menu
          ref="menu"
          v-model="dateFromDialog"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateFrom"
            :label="$t('report.dateFrom')"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="dateFrom"
            scrollable
            locale="es-MX"
            @input="menu = false"
          >
          </v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="dateToDialog"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="dateTo"
            :label="$t('report.dateTo')"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="dateTo"
            scrollable
            locale="es-MX"
            @input="menu = false"
          >
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs9 class="pa-4">
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
              <td>{{ report.item.name }}</td>
              <td class="text-xs-center" width="160">{{ report.item.quantity }}</td>
              <td class="text-xs-right" width="160">{{ report.item.total | currency }}</td>
            </tr>
          </template>
          <template slot="footer">
            <tr>
              <td class="text-xs-right">{{ $t('report.total') }}</td>
              <td class="text-xs-center">{{ quantity }}</td>
              <td class="text-xs-right">{{ total | currency }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        storeId: null,
        dateFrom: null,
        dateTo: null,
        stores: [],
        rows: [],
        dateFromDialog: false,
        dateToDialog: false,
        headers: [
          {
            text: this.$t('report.store'),
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
    computed: {
      valid () {
        return this.dateFrom && this.dateTo;
      },
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
    },
    watch: {
      dateFrom () {
        if (this.valid) {
          this.getReport();
        }
      },
      dateTo () {
        if (this.valid) {
          this.getReport();
        }
      }
    },
    methods: {
      getReport () {
        let self = this;

        this.$axios.post('/orders/storesReport', {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          storeId: this.storeId
        })
        .then(function (response) {
          self.rows = response.data;
        })
        .catch(function (error) {
          self.rows = [];
        });
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
