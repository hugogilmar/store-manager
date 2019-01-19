<template>
  <v-list
    two-line
    class="mb-5"
    style="position: relative;"
  >
    <v-alert
      :value="true"
      type="info"
      v-if="orderLines.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="orderLine in orderLines"
      :key="orderLine.id"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ orderLine.product.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ orderLine.quantity }} x {{ orderLine.price | currency }} - {{ orderLine.discountsTotal | currency }} ({{ orderLine.discountAmount | percentage }}) = {{ orderLine.total | currency }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn
          icon
          ripple
          @click="editOrderLine(orderLine.id)"
        >
          <v-icon color="grey">edit</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-action>
        <v-btn
          icon
          ripple
          @click="deleteOrderLine(orderLine.id)"
        >
          <v-icon color="red">delete</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        color="primary"
        slot="activator"
        dark
        small
        fab
        bottom
        right
        absolute
      >
        <v-icon>add</v-icon>
      </v-btn>
      <order-line-form
        :order-id.sync="orderId"
        :order-billable.sync="billable"
        :store-id.sync="storeId"
        :order-line-id.sync="orderLineId"
        @order-line-created="orderLineCreated"
        @order-line-updated="orderLineUpdated"
        @close-dialog="closeDialog"
        v-if="formDialog"
      />
      <order-line-delete-dialog
        :order-line-id.sync="orderLineId"
        @order-line-deleted="orderLineDeleted"
        @close-dialog="closeDialog"
        v-if="deleteDialog"
      />
    </v-dialog>
  </v-list>
</template>

<script>
  import OrderLineForm from './OrderLineForm.vue';
  import OrderLineDeleteDialog from './OrderLineDeleteDialog.vue';

  export default {
    name: 'OrderLineList',
    components: {
      'order-line-form': OrderLineForm,
      'order-line-delete-dialog': OrderLineDeleteDialog
    },
    data () {
      return {
        dialog: false,
        formDialog: true,
        deleteDialog: false,
        orderLineId: null
      }
    },
    props: [
      'orderId',
      'billable',
      'storeId',
      'orderLines'
    ],
    methods: {
      orderLineCreated () {
        this.closeDialog();
        this.$emit('order-line-created');
      },
      orderLineUpdated () {
        this.closeDialog();
        this.$emit('order-line-updated');
      },
      orderLineDeleted () {
        this.closeDialog();
        this.$emit('order-line-deleted');
      },
      editOrderLine (orderLineId) {
        this.orderLineId = orderLineId;
        this.formDialog = true;
        this.deleteDialog = false;
        this.dialog = true;
      },
      deleteOrderLine (orderLineId) {
        this.orderLineId = orderLineId;
        this.formDialog = false;
        this.deleteDialog = true;
        this.dialog = true;
      },
      closeDialog () {
        this.orderLineId = null;
        this.formDialog = true;
        this.deleteDialog = false;
        this.dialog = false;
      }
    }
  };
</script>
