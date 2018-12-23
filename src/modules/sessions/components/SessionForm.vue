<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="session.username"
      :rules="rules.username"
      :label="$t('session.username')"
      required
    ></v-text-field>
    <v-text-field
      v-model="session.password"
      type="password"
      :rules="rules.password"
      :label="$t('session.password')"
      required
    ></v-text-field>
    <v-btn
      color="primary"
      :disabled="!valid"
      @click="submit"
    >
      {{ $t('label.save') }}
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SessionForm',
  data () {
    return {
      valid: true,
      session: {
        username: null,
        password: null
      },
      rules: {
        username: [],
        password: []
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'displaySnackbar'
    ]),
    submit () {
      let self = this;

      this.$axios.post('/managers/login', {
        username: this.session.username,
        password: this.session.password
      })
      .then(function (response) {
        self.getUser(response.data.id, response.data.userId);
      })
      .catch(function (error) {
        self.displaySnackbar({
          color: 'error',
          message: self.$t('toast.failure.session')
        });
      });
    },
    getUser (authenticationToken, userId) {
      let self = this;

      this.$axios.get(`/managers/${userId}`, {
        headers: {
          'Authorization': authenticationToken
        }
      })
      .then(function (response) {
        self.login({
          authenticationToken: authenticationToken,
          user: response.data
        });
        self.displaySnackbar({
          color: 'success',
          message: self.$t('toast.success.session')
        });
      })
      .catch(function (error) {
        self.displaySnackbar({
          color: 'error',
          message: self.$t('toast.failure.session')
        });
      });
    }
  }
};
</script>
