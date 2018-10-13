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
    name: 'PaymentMethodForm',
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
    created () {
      this.getPaymentMethod();
    },
    methods: {
      getPaymentMethod () {
        let self = this;
        let paymentMethodId = this.$route.params.id;

        this.$axios.get(`/payment_methods/${paymentMethodId}`)
        .then(function (response) {
          self.paymentMethod = response.data;
        })
        .catch(function (error) {
          self.paymentMethod = {};
        });
      },
      submit () {
        let self = this;
        let paymentMethodId = this.$route.params.id;

        if (this.$refs.form.validate()) {
          this.$axios.put(`/payment_methods/${paymentMethodId}`, {
            name: this.paymentMethod.name
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
