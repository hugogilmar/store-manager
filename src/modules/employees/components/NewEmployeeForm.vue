<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="employee.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('employee.name')"
      required
    ></v-text-field>
    <v-select
      v-model="employee.storeId"
      :items="stores"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('employee.store')"
      item-text="name"
      item-value="id"
      required
    ></v-select>
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
    name: 'NewEmployeeForm',
    data () {
      return {
        valid: true,
        stores: [],
        employee: {
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
      this.getStores();
    },
    methods: {
      getStores () {
        let self = this;

        this.$axios.get('/stores')
        .then(function (response) {
          self.stores = response.data;
        })
        .catch(function (error) {
          self.stores = [];
        });
      },
      submit () {
        if (this.$refs.form.validate()) {
          this.$axios.post('/employees', {
            name: this.employee.name
          })
          .then(function (response) {
            self.employee = response.data;
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
