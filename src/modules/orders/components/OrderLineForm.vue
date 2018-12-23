<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-combobox
      v-model="product"
      :items="products"
      :rules="[v => !!v || 'Item is required']"
      :label="$t('orderLine.product')"
      :item-text="productText"
      item-value="id"
      required
    ></v-combobox>
    <v-text-field
      v-model="orderLine.quantity"
      :label="$t('orderLine.quantity')"
      required
    ></v-text-field>
    <v-checkbox
      :label="$t('orderLine.billable')"
      v-model="orderLine.billable"
    ></v-checkbox>
    <v-text-field
      v-model="orderLine.discountAmount"
      :label="$t('orderLine.discountAmount')"
      required
    ></v-text-field>
    <v-text-field
      v-model="orderLine.comment"
      :counter="48"
      :label="$t('orderLine.comment')"
      required
    ></v-text-field>
    <v-btn
      flat
      @click="cancel"
    >
      {{ $t('label.cancel') }}
    </v-btn>
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
    name: 'OrderLineForm',
    data () {
      return {
        valid: true,
        orderLine: {},
        product: {},
        products: []
      }
    },
    props: [
      'orderId',
      'storeId',
      'orderLineId'
    ],
    computed: {
      productId () {
        return this.product.id;
      }
    },
    watch: {
      orderLine (object) {
        this.product = object.product;
      },
      product (object) {
        this.orderLine.productId = object.id;
      },
      storeId (value) {
        this.getProducts();
      },
      orderLineId (value) {
        let orderLineId = value;

        if (orderLineId) {
          this.getOrderLine(orderLineId);
        } else {
          this.reset();
        }
      }
    },
    created () {
      let orderLineId = this.orderLineId;

      this.getProducts();

      if (orderLineId) {
        this.getOrderLine(this.orderLineId);
      } else {
        this.reset();
      }
    },
    methods: {
      ...mapActions([
        'displaySnackbar'
      ]),
      productText (product) {
        return (product.code ? product.code : '') + ' ' + (product.name ? product.name : '');
      },
      getProducts () {
        let self = this;
        let storeId = this.storeId;

        this.$axios.get('/products', {
          params: {
            filter: {
              where: {
                storeId: storeId
              }
            }
          }
        })
        .then(function (response) {
          self.products = response.data;
        })
        .catch(function (error) {
          self.products = [];
        });
      },
      getOrderLine (orderLineId) {
        let self = this;

        this.$axios.get(`/order_lines/${orderLineId}`, {
          params: {
            filter: {
              include: 'product'
            }
          }
        })
        .then(function (response) {
          self.orderLine = response.data;
        })
        .catch(function (error) {
          self.orderLine = {};
        });
      },
      createOrderLine () {
        let self = this;

        this.$axios.post('/order_lines', {
          orderId: this.orderId,
          productId: this.orderLine.productId,
          quantity: this.orderLine.quantity,
          billable: this.orderLine.billable,
          discountAmount: this.orderLine.discountAmount,
          comment: this.orderLine.comment
        })
        .then(function (response) {
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.create')
          });
          self.reset();
          self.$emit('order-line-created');
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.create')
          });
        });
      },
      updateOrderLine (orderLineId) {
        let self = this;

        this.$axios.put(`/order_lines/${orderLineId}`, {
          orderId: this.orderId,
          productId: this.orderLine.productId,
          quantity: this.orderLine.quantity,
          billable: this.orderLine.billable,
          discountAmount: this.orderLine.discountAmount,
          comment: this.orderLine.comment
        })
        .then(function (response) {
          self.displaySnackbar({
            color: 'success',
            message: self.$t('notification.success.update')
          });
          self.reset();
          self.$emit('order-line-updated');
        })
        .catch(function (error) {
          self.displaySnackbar({
            color: 'error',
            message: self.$t('notification.failure.update')
          });
        });
      },
      submit () {
        let orderLineId = this.orderLineId;

        if (this.$refs.form.validate()) {
          if (orderLineId) {
            this.updateOrderLine(orderLineId);
          } else {
            this.createOrderLine();
          }
        } else {
          this.valid = false;
        }
      },
      resetProduct () {
        this.product = {};
      },
      resetOrderLine () {
        this.orderLine = {
          productId: null,
          quantity: 0,
          price: 0.00,
          subtotal: 0.00,
          total: 0.00,
          billable: true,
          discountAmount: 0.00,
          comment: null,
          product: {}
        }
      },
      reset () {
        this.resetProduct();
        this.resetOrderLine();
      },
      cancel () {
        this.reset();
        this.$emit('cancel');
      }
    }
  };
</script>
