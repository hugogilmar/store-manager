<template>
  <v-form v-model="valid" lazy-validation>
    <v-combobox
      v-model="product"
      item-value="id"
      v-validate="'required'"
      data-vv-name="product"
      :items="products"
      :label="$t('orderLine.product')"
      :item-text="productText"
      :data-vv-as="$t('orderLine.product').toLowerCase()"
      :error-messages="errors.first('product')"
    ></v-combobox>
    <v-text-field
      v-model="orderLine.quantity"
      v-validate="'required|numeric|min_value:1'"
      data-vv-name="quantity"
      :data-vv-as="$t('orderLine.quantity').toLowerCase()"
      :label="$t('orderLine.quantity')"
      :error-messages="errors.first('quantity')"
    ></v-text-field>
    <v-checkbox
      :label="$t('orderLine.billable')"
      v-model="orderLine.billable"
    ></v-checkbox>
    <v-text-field
      v-model="orderLine.discountAmount"
      v-validate="'numeric|min_value:0'"
      data-vv-name="discountAmount"
      :data-vv-as="$t('orderLine.discountAmount').toLowerCase()"
      :label="$t('orderLine.discountAmount')"
      :error-messages="errors.first('discountAmount')"
    ></v-text-field>
    <v-text-field
      v-model="orderLine.comment"
      v-validate="'max:48'"
      data-vv-name="comment"
      :data-vv-as="$t('orderLine.comment').toLowerCase()"
      :counter="48"
      :label="$t('orderLine.comment')"
      :error-messages="errors.first('comment')"
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
        orderLine: {
          productId: null,
          quantity: null,
          discountAmount: 0,
          billable: true,
          comment: null,
          price: null,
          subtotal: null,
          total: null
        },
        product: null,
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
      product (object) {
        if (object) {
          this.orderLine.productId = object.id;
        }
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
          self.product = self.orderLine.product;
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
        let self = this;
        let orderLineId = this.orderLineId;

        this.$validator.validate().then(function (valid) {
          if (valid) {
            if (orderLineId) {
              self.updateOrderLine(orderLineId);
            } else {
              self.createOrderLine();
            }
          }
        });
      },
      resetProduct () {
        this.product = null;
      },
      resetOrderLine () {
        this.orderLine = {
          productId: null,
          quantity: null,
          discountAmount: 0,
          billable: true,
          comment: null,
          price: null,
          subtotal: null,
          total: null
        }
      },
      reset () {
        this.resetProduct();
        this.resetOrderLine();
      },
      cancel () {
        this.reset();
        this.$validator.reset();
        this.$emit('cancel');
      }
    }
  };
</script>
