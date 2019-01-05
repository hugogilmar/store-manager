<template>
  <v-snackbar
    bottom
    v-model="snackbarIsVisible"
    :color="snackbarColor"
    :timeout="snackbarTimeOut"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapGetters([
      'snackbarVisible',
      'snackbarColor',
      'snackbarMessage',
      'snackbarTimeOut'
    ]),
    snackbarIsVisible: {
      get () {
        return this.snackbarVisible
      },
      set (_value) {
        this.dismissSnackbar()
      }
    }
  },
  methods: {
    ...mapActions([
      'dismissSnackbar'
    ])
  }
}
</script>
