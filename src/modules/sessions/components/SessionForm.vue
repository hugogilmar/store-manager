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
          username: '',
          password: ''
        },
        rules: {
          username: [],
          password: []
        }
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      submit () {
        let self = this;

        this.$axios.post('/managers/login', {
          username: this.session.username,
          password: this.session.password
        })
        .then(function (response) {
          self.login(response.data.id);
        })
        .catch(function (error) {
          // todo
        });
      }
    }
  };
</script>

<style></script>
