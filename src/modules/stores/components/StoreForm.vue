<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="store.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('productCategory.name')"
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
    name: 'StoreForm',
    data () {
      return {
        valid: true,
        store: {
          name: ''
        },
        rules: {
          name: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 48) || 'Name must be less than 48 characters'
          ]
        }
      }
    },
    created () {
      this.getStore();
    },
    methods: {
      getStore () {
        let self = this;
        let storeId = this.$route.params.id;

        this.$axios.get(`/stores/${storeId}`)
        .then(function (response) {
          self.store = response.data;
        })
        .catch(function (error) {
          self.store = {};
        });
      },
      submit () {
        let self = this;
        let storeId = this.$route.params.id;

        if (this.$refs.form.validate()) {
          this.$axios.put(`/stores/${storeId}`, {
            name: this.store.name
          })
          .then(function (response) {
            self.store = response.data;
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
