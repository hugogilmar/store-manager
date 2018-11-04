<template>
  <v-card class="ma-4">
    <v-subheader>{{ $t('header.list', { entity: $tc('entities.charge', 2) }) }}</v-subheader>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <charge-list />
      </v-slide-y-transition>
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fab
          fixed
          bottom
          right
          @click="newCharge()"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-container>
  </v-card>
</template>

<script>
  import ChargeList from '../components/ChargeList.vue';

  export default {
    components: {
      'charge-list': ChargeList
    },
    methods: {
      newCharge: function () {
        this.$router.push({ path: '/charges/new' });
      }
    }
  }
</script>
