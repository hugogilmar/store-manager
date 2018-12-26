<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="paymentMethod.name"
      v-validate="'required|max:48'"
      data-vv-name="name"
      :data-vv-as="$t('paymentMethod.name').toLowerCase()"
      :counter="48"
      :label="$t('paymentMethod.name')"
      :error-messages="errors.first('name')"
    ></v-text-field>
    <v-text-field
      v-model="paymentMethod.code"
      v-validate="'required|max:10'"
      data-vv-name="code"
      :data-vv-as="$t('paymentMethod.code').toLowerCase()"
      :counter="10"
      :label="$t('paymentMethod.code')"
      :error-messages="errors.first('code')"
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
    name: 'PaymentMethodForm',
    data () {
      return {
        valid: true,
        paymentMethod: {
          name: null,
          code: null
        }
      }
    },
    props: [
      'paymentMethodId'
    ],
    created () {
      let paymentMethodId = this.getPaymentMethodId();

      if (paymentMethodId) {
        this.getPaymentMethod(paymentMethodId);
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      getPaymentMethodId () {
        return this.paymentMethodId;
      },
      getPaymentMethod (paymentMethodId) {
        let self = this;

        this.$axios.get(`/payment_methods/${paymentMethodId}`)
        .then(function (response) {
          self.paymentMethod = response.data;
        })
        .catch(function (error) {
          self.paymentMethod = {};
        });
      },
      createPaymentMethod () {
        let self = this;

        this.$axios.post('/payment_methods', {
          name: this.paymentMethod.name,
          code: this.paymentMethod.code
        })
        .then(function (response) {
          self.paymentMethod = response.data;
          self.editPaymentMethod(self.paymentMethod.id);
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.create')
          });
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.create')
          });
        });
      },
      updatePaymentMethod (paymentMethodId) {
        let self = this;

        this.$axios.put(`/payment_methods/${paymentMethodId}`, {
          name: this.paymentMethod.name,
          code: this.paymentMethod.code
        })
        .then(function (response) {
          self.paymentMethod = response.data;
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.update')
          });
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.update')
          });
        });
      },
      submit () {
        let self = this;
        let paymentMethodId = this.getPaymentMethodId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (paymentMethodId) {
              self.updatePaymentMethod(paymentMethodId);
            } else {
              self.createPaymentMethod();
            }
          }
        });
      },
      editPaymentMethod: function (paymentMethodId) {
        this.$router.push({ path: `/payment_methods/${paymentMethodId}` });
      }
    }
  };
</script>
