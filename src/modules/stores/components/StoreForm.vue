<template>
  <v-form v-model="valid" lazy-validation>
    <v-text-field
      v-model="store.name"
      v-validate="'required|max:48'"
      data-vv-name="name"
      :data-vv-as="$t('store.name').toLowerCase()"
      :counter="48"
      :label="$t('store.name')"
      :error-messages="errors.first('name')"
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
    name: 'StoreForm',
    data () {
      return {
        valid: true,
        store: {
          name: null
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
      ...mapActions([
        'displaySnackbar'
      ]),
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
      updateStore (storeId) {
        let self = this;

        this.$axios.put(`/stores/${storeId}`, {
          name: this.store.name
        })
        .then(function (response) {
          self.store = response.data;
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
        let storeId = this.getStoreId();

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (storeId) {
              self.updateStore(storeId);
            } else {
              self.createStore();
            }
          }
        });
      },
      editStore (storeId) {
        this.$router.push({ path: `/stores/${storeId}` });
      }
    }
  };
</script>
