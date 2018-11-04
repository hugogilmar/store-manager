<template>
  <v-list>
    <v-alert
      :value="true"
      type="info"
      v-if="charges.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="charge in charges"
      :key="charge.id"
      avatar
      @click="editCharge(charge.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="charge.name"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="charge.avatar">
        <img :src="charge.avatar">
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'ChargeList',
    data () {
      return {
        charges: []
      }
    },
    created () {
      this.getCharges();
    },
    methods: {
      getCharges () {
        let self = this;

        this.$axios.get('/charges')
        .then(function (response) {
          self.charges = response.data;
        })
        .catch(function (error) {
          self.charges = [];
        });
      },
      editCharge: function (productCategoryId) {
        this.$router.push({ path: `/charges/${productCategoryId}` });
      }
    }
  };
</script>
