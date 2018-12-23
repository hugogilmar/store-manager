<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-btn
      color="error"
      slot="activator"
      dark
      fab
      bottom
      right
      fixed
    >
      <v-icon>delete</v-icon>
    </v-btn>
    <v-card>
      <v-card-title
        class="headline"
      >
        {{ $t('dialog.delete.title', { entity: $tc('entities.charge', 1) }) }}
      </v-card-title>
      <v-card-text>
        {{ $t('dialog.delete.message', { entity: $tc('entities.charge', 1) }) }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="dialog = false"
        >
          {{ $t('label.cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="deleteCharge"
        >
          {{ $t('label.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ChargeDeleteDialog',
  data () {
    return {
      dialog: false
    }
  },
  props: [
    'chargeId'
  ],
  methods: {
    ...mapActions([
      'displaySnackbar'
    ]),
    getChargeId () {
      return this.chargeId;
    },
    deleteCharge () {
      let self = this;
      let chargeId = this.getChargeId();

      this.$axios.delete(`/charges/${chargeId}`)
      .then(function (response) {
        self.dialog = false;
        self.chargeList();
        self.displaySnackbar({
          color: 'success',
          message: self.$t('notification.success.delete')
        });
      })
      .catch(function (error) {
        self.dialog = false;
        self.displaySnackbar({
          color: 'error',
          message: self.$t('notification.failure.delete')
        });
      });
    },
    chargeList () {
      this.$router.push({ path: '/charges' });
    }
  }
};
</script>
