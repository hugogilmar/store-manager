<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('report.header.consolidated') }}</v-subheader>
    <v-layout row wrap>
      <v-flex xs3>
        <v-container>
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
        </v-container>
      </v-flex>
      <v-flex xs9>
        <v-container id="report">
          <h3 class="headline mb-4">{{ $t('report.title.consolidated') }}</h3>
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
          <h4 class="subheading my-4">{{ $t('report.header.store') }}</h4>
          <store-report
            :rows.sync="storeRows"
          />
          <h4 class="subheading my-4">{{ $t('report.header.productCategory') }}</h4>
          <product-category-report
            :rows.sync="productCategoryRows"
          />
          <h4 class="subheading my-4">{{ $t('report.header.paymentMethod') }}</h4>
          <payment-method-report
            :rows.sync="paymentMethodRows"
          />
          <h4 class="subheading my-4">{{ $t('report.header.charge') }}</h4>
          <charge-report
            :rows.sync="chargeRows"
          />
          <h4 class="subheading my-4">{{ $t('report.header.product') }}</h4>
          <product-report
            :rows.sync="productRows"
          />
        </v-container>
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
  import ChargeReport from '../components/ChargeReport.vue';
  import PaymentMethodReport from '../components/PaymentMethodReport.vue';
  import ProductReport from '../components/ProductReport.vue';
  import ProductCategoryReport from '../components/ProductCategoryReport.vue';
  import StoreReport from '../components/StoreReport.vue';

  export default {
    components: {
      'charge-report': ChargeReport,
      'payment-method-report': PaymentMethodReport,
      'product-report': ProductReport,
      'product-category-report': ProductCategoryReport,
      'store-report': StoreReport
    },
    data () {
      return {
        storeId: null,
        dateFrom: null,
        dateTo: null,
        stores: [],
        chargeRows: [],
        paymentMethodRows: [],
        productRows: [],
        productCategoryRows: [],
        rows: [],
        dateFromDialog: false,
        dateToDialog: false
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
      storeRows () {
        let self = this;

        return this.rows.filter(function (row) {
          return row.name == self.storeName;
        });
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
      getStoreReport () {
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
      getProductCategoryReport () {
        let self = this;

        this.$axios.post('/order_lines/productCategoriesReport', {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          storeId: this.storeId
        })
        .then(function (response) {
          self.productCategoryRows = response.data;
        })
        .catch(function (error) {
          self.productCategoryRows = [];
        });
      },
      getPaymentMethodReport () {
        let self = this;

        this.$axios.post('/invoices/paymentMethodsReport', {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          storeId: this.storeId
        })
        .then(function (response) {
          self.paymentMethodRows = response.data;
        })
        .catch(function (error) {
          self.paymentMethodRows = [];
        });
      },
      getChargeReport () {
        let self = this;

        this.$axios.post('/order_charges/chargesReport', {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          storeId: this.storeId
        })
        .then(function (response) {
          self.chargeRows = response.data;
        })
        .catch(function (error) {
          self.chargeRows = [];
        });
      },
      getProductReport () {
        let self = this;

        this.$axios.post('/order_lines/productsReport', {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
          storeId: this.storeId
        })
        .then(function (response) {
          self.productRows = response.data;
        })
        .catch(function (error) {
          self.productRows = [];
        });
      },
      getReport () {
        this.getStoreReport();
        this.getProductCategoryReport();
        this.getPaymentMethodReport();
        this.getChargeReport();
        this.getProductReport();
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
