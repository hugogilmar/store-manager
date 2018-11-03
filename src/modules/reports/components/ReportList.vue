<template>
  <v-list>
    <v-list-tile>
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('report.product') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('report.paymentMethod') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'ReportList'
  };
</script>
