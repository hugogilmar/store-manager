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
          <div class="mb-2 pa-2">
            <h3 class="title">{{ $t('report.title.paymentMethod') }}</h3>
            <p class="my-4">
              <strong class="mr-2">{{ $t('report.store') }}:</strong> {{ storeName }}
              <strong class="ml-4 mr-2">{{ $t('report.dateFrom') }}:</strong> {{ dateFrom }}
              <strong class="ml-4 mr-2">{{ $t('report.dateTo') }}:</strong> {{ dateTo }}
            </p>
          </div>
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
  import { mapGetters } from 'vuex';

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
        'getStoreId'
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
      dateFrom () {
        if (this.valid) {
          this.getReport();
        }
      },
      dateTo () {
        if (this.valid) {
          this.getReport();
        }
      },
      storeId () {
        if (this.valid) {
          this.getReport();
        }
      }
    },
    created () {
      this.getStores();

      this.storeId = this.getStoreId;
    },
    methods: {
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
