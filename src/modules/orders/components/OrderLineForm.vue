<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-combobox
      v-model="orderLine.product"
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
  export default {
    name: 'OrderLineForm',
    data () {
      return {
        valid: true,
        orderLine: {
          product: {
            id: 0
          }
        },
        products: []
      }
    },
    props: [
      'orderId',
      'orderLineId'
    ],
    computed: {
      productId () {
        return this.orderLine.product.id;
      }
    },
    watch: {
      productId: function (value) {
        this.orderLine.productId = value;
      },
      orderLineId () {
        let orderLineId = this.orderLineId;

        if (orderLineId) {
          this.getOrderLine(this.orderLineId);
        } else {
          this.resetOrderLine();
        }
      }
    },
    created () {
      let orderLineId = this.orderLineId;

      this.getProducts();

      if (orderLineId) {
        this.getOrderLine(this.orderLineId);
      } else {
        this.resetOrderLine();
      }
    },
    methods: {
      productText (product) {
        return product.code + ' ' + product.name;
      },
      getProducts () {
        let self = this;

        this.$axios.get('/products')
        .then(function (response) {
          self.products = response.data;
        })
        .catch(function (error) {
          self.products = [];
        });
      },
      resetOrderLine () {
        this.orderLine = {
          productId: 0,
          quantity: 0,
          price: 0.00,
          subtotal: 0.00,
          total: 0.00,
          billable: true,
          comment: '',
          product: {
            id: 0,
            code: '',
            name: ''
          }
        }
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
          comment: this.orderLine.comment
        })
        .then(function (response) {
          self.$emit('order-line-created');
        })
        .catch(function (error) {
          self.valid = false;
        });
      },
      updateOrderLine (orderLineId) {
        let self = this;

        this.$axios.put(`/order_lines/${orderLineId}`, {
          orderId: this.orderId,
          productId: this.orderLine.productId,
          quantity: this.orderLine.quantity,
          billable: this.orderLine.billable,
          comment: this.orderLine.comment
        })
        .then(function (response) {
          self.$emit('order-line-updated');
        })
        .catch(function (error) {
          self.valid = false;
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
      cancel () {
        this.resetOrderLine();
        this.$emit('cancel');
      }
    }
  };
</script>
