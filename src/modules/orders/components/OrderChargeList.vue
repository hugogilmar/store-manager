<template>
  <v-list
    two-line
    class="mb-5"
    style="position: relative;"
  >
    <v-alert
      :value="true"
      type="info"
      v-if="orderCharges.length == 0"
    >
      {{ $t('alert.empty') }}
    </v-alert>
    <v-list-tile
      v-for="orderCharge in orderCharges"
      :key="orderCharge.id"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ orderCharge.charge.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ orderCharge.amount | percentage }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn
          icon
          ripple
          @click="editOrderCharge(orderCharge.id)"
        >
          <v-icon color="grey">edit</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-action>
        <v-btn
          icon
          ripple
          @click="deleteOrderCharge(orderCharge.id)"
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
      <order-charge-form
        :order-id.sync="orderId"
        :store-id.sync="storeId"
        :order-charge-id.sync="orderChargeId"
        @order-charge-created="orderChargeCreated"
        @order-charge-updated="orderChargeUpdated"
        @close-dialog="closeDialog"
        v-if="formDialog"
      />
      <order-charge-delete-dialog
        :order-charge-id.sync="orderChargeId"
        @order-charge-deleted="orderChargeDeleted"
        @close-dialog="closeDialog"
        v-if="deleteDialog"
      />
    </v-dialog>
  </v-list>
</template>

<script>
  import OrderChargeForm from './OrderChargeForm.vue';
  import OrderChargeDeleteDialog from './OrderChargeDeleteDialog.vue';

  export default {
    name: 'OrderChargeList',
    components: {
      'order-charge-form': OrderChargeForm,
      'order-charge-delete-dialog': OrderChargeDeleteDialog
    },
    data () {
      return {
        dialog: false,
        formDialog: true,
        deleteDialog: false,
        orderChargeId: null
      }
    },
    props: [
      'orderId',
      'storeId',
      'orderCharges'
    ],
    methods: {
      orderChargeCreated () {
        this.closeDialog();
        this.$emit('order-charge-created');
      },
      orderChargeUpdated () {
        this.closeDialog();
        this.$emit('order-charge-updated');
      },
      orderChargeDeleted () {
        this.closeDialog();
        this.$emit('order-charge-deleted');
      },
      editOrderCharge (orderChargeId) {
        this.orderChargeId = orderChargeId;
        this.formDialog = true;
        this.deleteDialog = false;
        this.dialog = true;
      },
      deleteOrderCharge (orderChargeId) {
        this.orderChargeId = orderChargeId;
        this.formDialog = false;
        this.deleteDialog = true;
        this.dialog = true;
      },
      closeDialog () {
        this.orderChargeId = null;
        this.formDialog = true;
        this.deleteDialog = false;
        this.dialog = false;
      }
    }
  };
</script>
