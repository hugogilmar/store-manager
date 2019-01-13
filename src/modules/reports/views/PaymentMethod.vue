<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('report.header.paymentMethod') }}</v-subheader>
    <v-layout row wrap>
      <v-flex xs3 class="pa-4">
        <v-select
          v-model="storeId"
          :items="stores"
          :rules="[v => !!v || 'Item is required']"
          :label="$t('report.store')"
          item-text="name"
          item-value="id"
          required
        ></v-select>
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
            <h3 class="headline mb-4">{{ $t('report.title.paymentMethod') }}</h3>
            <v-layout wrap>
              <v-flex xs4>
                <p class="mb-1">{{ storeName }}</p>
                <p>
                  <small>{{ $t('order.store') }}</small>
                </p>
              </v-flex>
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
            </v-layout>
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
    computed: {
      ...mapGetters([
        'getStoreId',
        'getReportParams',
        'getReportParam'
      ]),
      storeName () {
        let self = this;

        let store = this.stores.find(function (store) {
          return store.id == self.storeId;
        });

        return store ? store.name : '';
      },
      valid () {
        return this.storeId && this.dateFrom && this.dateTo;
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
      },
      storeId (value) {
        this.setFilter('storeId', value);

        if (this.valid) {
          this.getReport();
        }
      }
    },
    created () {
      let storeId = this.getReportParam('storeId');
      let dateFrom = this.getReportParam('dateFrom');
      let dateTo = this.getReportParam('dateTo');

      if (storeId) {
        this.storeId = parseInt(storeId);
      } else {
        this.storeId = this.getStoreId;
      }

      if (dateFrom) {
        this.dateFrom = dateFrom;
      }

      if (dateTo) {
        this.dateTo = dateTo;
      }

      this.getStores();
    },
    methods: {
      ...mapActions([
        'setReportParam',
        'deleteReportParam'
      ]),
      getStores () {
        let self = this;

        this.$axios.get('/stores')
        .then(function (response) {
          self.stores = response.data;
        })
        .catch(function (error) {
          self.stores = [];
        });
      },
      getReport () {
        let self = this;

        this.$axios.post('/invoices/paymentMethodsReport', {
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
