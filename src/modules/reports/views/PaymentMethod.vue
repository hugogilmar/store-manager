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
        <table class="v-table theme--light">
          <thead>
            <th width="60" class="text-xs-center">{{ $t('report.code') }}</th>
            <th class="text-xs-left">{{ $t('report.paymentMethod') }}</th>
            <th width="60" class="text-xs-center">{{ $t('report.quantity') }}</th>
            <th width="120" class="text-xs-right">{{ $t('report.total') }}</th>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.code">
              <td class="text-xs-center">{{ row.code }}</td>
              <td>{{ row.name }}</td>
              <td class="text-xs-center">{{ row.quantity }}</td>
              <td class="text-xs-right">{{ row.total | currency }}</td>
            </tr>
          </tbody>
        </table>
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
        dateToDialog: false
      }
    },
    computed: {
      valid () {
        return this.storeId && this.dateFrom && this.dateTo;
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

        this.$axios.post('/orders/paymentMethodsReport', {
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
    color: rgba(0, 0, 0, .54);
  }
</style>
