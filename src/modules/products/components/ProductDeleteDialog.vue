<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-btn
      color="error"
      slot="activator"
      dark
      fab
      bottom
      right
      fixed
    >
      <v-icon>delete</v-icon>
    </v-btn>
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ $t('dialog.delete.title', { entity: $tc('entities.product', 1) }) }}
      </v-card-title>

      <v-card-text>
        {{ $t('dialog.delete.message', { entity: $tc('entities.product', 1) }) }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          @click="dialog = false"
        >
          {{ $t('label.cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="deleteProduct"
        >
          {{ $t('label.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ProductDeleteDialog',
  data () {
    return {
      dialog: false
    }
  },
  props: [
    'productId'
  ],
  methods: {
    getProductId () {
      return this.productId;
    },
    deleteProduct () {
      let self = this;
      let productId = this.getProductId();

      this.$axios.delete(`/products/${productId}`)
      .then(function (response) {
        self.dialog = false;
        self.productList();
      })
      .catch(function (error) {
        self.dialog = false;
      });
    },
    productList () {
      this.$router.push({ path: '/products' });
    }
  }
};
</script>
