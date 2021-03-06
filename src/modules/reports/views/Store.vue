<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('report.header.store') }}</v-subheader>
    <v-layout row wrap>
      <v-flex xs3>
        <v-container>
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
          <store-report
            :rows.sync="rows"
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
  import StoreReport from '../components/StoreReport.vue';

  export default {
    components: {
      'store-report': StoreReport
    },
    data () {
      return {
        storeId: null,
        dateFrom: null,
        dateTo: null,
        stores: [],
        rows: [],
        dateFromDialog: false,
        dateToDialog: false,
      }
    },
    computed: {
      ...mapGetters([
        'getReportParams',
        'getReportParam'
      ]),
      valid () {
        return this.dateFrom && this.dateTo;
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
