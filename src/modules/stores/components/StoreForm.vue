<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="store.name"
      :rules="rules.name"
      :counter="48"
      :label="$t('store.name')"
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
    props: [
      'storeId'
    ],
    created () {
      let storeId = this.getStoreId()

      if (storeId) {
        this.getStore(storeId);
      }
    },
    methods: {
      getStoreId () {
        return this.storeId;
      },
      getStore (storeId) {
        let self = this;

        this.$axios.get(`/stores/${storeId}`)
        .then(function (response) {
          self.store = response.data;
        })
        .catch(function (error) {
          self.store = {};
        });
      },
      createStore () {
        let self = this;

        this.$axios.post('/stores', {
          name: this.store.name
        })
        .then(function (response) {
          self.store = response.data;
          self.editStore(self.store.id);
          self.$toasted.success(self.$t('toast.success.create'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.create'));
        });
      },
      updateStore (storeId) {
        let self = this;

        this.$axios.put(`/stores/${storeId}`, {
          name: this.store.name
        })
        .then(function (response) {
          self.store = response.data;
          self.$toasted.success(self.$t('toast.success.update'));
        })
        .catch(function (error) {
          self.$toasted.error(self.$t('toast.failure.update'));
        });
      },
      submit () {
        let storeId = this.getStoreId();

        if (this.$refs.form.validate()) {
          if (storeId) {
            this.updateStore(storeId);
          } else {
            this.createStore();
          }
        } else {
          this.valid = false;
        }
      },
      editStore: function (storeId) {
        this.$router.push({ path: `/stores/${storeId}` });
      }
    }
  };
</script>
