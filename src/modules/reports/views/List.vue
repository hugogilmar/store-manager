<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.list', { entity: $tc('entities.report', 2) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <report-list></report-list>
      </v-slide-y-transition>
    </v-container>
  </v-card>
</template>

<script>
  import ReportList from '../components/ReportList.vue';

  export default {
    components: {
      'report-list': ReportList
    }
  }
</script>
