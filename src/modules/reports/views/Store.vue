<template>
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
        <div id="report">
          <v-container grid-list-md>
            <h3 class="headline mb-4">{{ $t('report.title.store') }}</h3>
            <v-layout wrap>
              <v-flex xs4>
                <p class="mb-1">{{ dateFrom }}</p>
                <p>
                  <small>{{ $t('report.dateFrom') }}</small>
                </p>
              </v-flex>
              <v-flex xs4>
                <p class="mb-1">{{ dateTo }}</p>
                <p>
                  <small>{{ $t('report.dateTo') }}</small>
                </p>
              </v-flex>
              <v-flex xs4></v-flex>
            </v-layout>
            <v-subheader>{{ $t('report.header.billable') }}</v-subheader>
            <v-data-table
              hide-actions
              :headers="headers"
              :items="billableRows"
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
                  <td class="text-xs-center">{{ billableQuantity }}</td>
                  <td class="text-xs-right">{{ billableTotal | currency }}</td>
                </tr>
              </template>
            </v-data-table>
            <v-subheader>{{ $t('report.header.nonBillable') }}</v-subheader>
            <v-data-table
              hide-actions
              :headers="headers"
              :items="nonBillableRows"
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
                  <td class="text-xs-center">{{ nonBillableQuantity }}</td>
                  <td class="text-xs-right">{{ nonBillableTotal | currency }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-container>
        </div>
      </v-flex>
    </v-layout>
    <v-fab-transition>
      <v-btn
        dark
        fab
        fixed
        bottom
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
  import { mapGetters, mapActions } from 'vuex';
  import _ from 'lodash';

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
      ...mapGetters([
        'getReportParams',
        'getReportParam'
      ]),
      valid () {
        return this.dateFrom && this.dateTo;
      },
      billableRows () {
        return this.rows.filter(function (row) {
          return row.billable;
        });
      },
      nonBillableRows () {
        return this.rows.filter(function (row) {
          return !row.billable;
        });
      },
      billableQuantity () {
        return this.billableRows.reduce(function (sum, row) {
          return sum += row.quantity;
        }, 0);
      },
      nonBillableQuantity () {
        return this.nonBillableRows.reduce(function (sum, row) {
          return sum += row.quantity;
        }, 0);
      },
      billableTotal () {
        return this.billableRows.reduce(function (sum, row) {
          return sum += row.total;
        }, 0);
      },
      nonBillableTotal () {
        return this.nonBillableRows.reduce(function (sum, row) {
          return sum += row.total;
        }, 0);
      }
    },
    watch: {
      dateFrom (value) {
        this.setFilter('dateFrom', value);

        if (this.valid) {
          this.getReport();
        }
      },
      dateTo (value) {
        this.setFilter('dateTo', value);

        if (this.valid) {
          this.getReport();
        }
      }
    },
    created () {
      let dateFrom = this.getReportParam('dateFrom');
      let dateTo = this.getReportParam('dateTo');

      if (dateFrom) {
        this.dateFrom = dateFrom;
      }

      if (dateTo) {
        this.dateTo = dateTo;
      }
    },
    methods: {
      ...mapActions([
        'setReportParam',
        'deleteReportParam'
      ]),
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
      },
      setFilter (filter, value) {
        if (!_.isNil(value)) {
          this.setReportParam({
            param: filter,
            value: value
          });
        } else {
          this.deleteReportParam({
            param: filter
          });
        }
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
