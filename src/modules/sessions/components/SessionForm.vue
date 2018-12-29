<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="session.username"
      v-validate="'required'"
      data-vv-name="username"
      :data-vv-as="$t('session.username').toLowerCase()"
      :label="$t('session.username')"
      :error-messages="errors.first('username')"
    ></v-text-field>
    <v-text-field
      v-model="session.password"
      type="password"
      v-validate="'required'"
      data-vv-name="password"
      :data-vv-as="$t('session.password').toLowerCase()"
      :label="$t('session.password')"
      :error-messages="errors.first('password')"
    ></v-text-field>
    <v-btn
      color="primary"
      :disabled="!valid"
      @click="submit"
    >
      {{ $t('label.login') }}
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

      this.$validator.validate().then(function (valid) {
        if (valid) {
          self.$axios.post('/managers/login', {
            username: self.session.username,
            password: self.session.password
          })
          .then(function (response) {
            self.getUser(response.data.id, response.data.userId);
          })
          .catch(function (error) {
            self.displaySnackbar({
              color: 'error',
              message: self.$t('notification.failure.session')
            });
          });
        }
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
          message: self.$t('notification.success.session')
        });
      })
      .catch(function (error) {
        self.displaySnackbar({
          color: 'error',
          message: self.$t('notification.failure.session')
        });
      });
    }
  }
};
</script>
