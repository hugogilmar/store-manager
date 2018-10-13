<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="paymentMethod.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('paymentMethod.name')"
      required
    ></v-text-field>
    <v-text-field
      v-model="paymentMethod.code"
      :rules="rules.code"
      :counter="10"
      :label="$t('paymentMethod.code')"
      required
    ></v-text-field>
    <v-btn
      color="primary"
      :disabled="!valid"
      @click="submit"
    >
      {{ $t('label.save') }}
    </v-btn>
    <v-btn
      @click="clear"
    >
      {{ $t('label.clear') }}
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    name: 'NewPaymentMethodForm',
    data () {
      return {
        valid: true,
        paymentMethod: {
          name: '',
          code: ''
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ],
          code: [
            v => !!v || 'Code is required',
            v => (v && v.length <= 10) || 'Code must be less than 10 characters'
          ]
        }
      }
    },
    methods: {
      submit () {
        let self = this;

        if (this.$refs.form.validate()) {
          this.$axios.post('/payment_methods', {
            name: this.paymentMethod.name,
            code: this.paymentMethod.code
          })
          .then(function (response) {
            self.paymentMethod = response.data;
          })
          .catch(function (error) {
            self.valid = false;
          });
        } else {
          this.valid = false;
        }
      },
      clear () {
        this.$refs.form.reset();
      }
    }
  };
</script>
