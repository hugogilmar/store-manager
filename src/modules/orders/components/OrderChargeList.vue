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
      avatar
      @click="editOrderCharge(orderCharge.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ orderCharge.charge.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ orderCharge.amount | percentage }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="orderCharge.avatar">
        <img :src="orderCharge.avatar">
      </v-list-tile-avatar>
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
      <v-card>
        <v-card-title
          class="headline"
        >
          {{ $t('dialog.add.title', { entity: $tc('entities.charge', 1) }) }}
        </v-card-title>
        <v-card-text>
          {{ $t('dialog.add.message', { entity: $tc('entities.charge', 1) }) }}
        </v-card-text>
        <v-card-text>
          <order-line-form
            :order-id.sync="orderId"
            :store-id.sync="storeId"
            :order-charge-id.sync="orderChargeId"
            @order-charge-created="orderChargeCreated"
            @order-charge-updated="orderChargeUpdated"
            @cancel="cancel"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
  import OrderChargeForm from './OrderChargeForm.vue';

  export default {
    name: 'OrderChargeList',
    components: {
      'order-line-form': OrderChargeForm
    },
    data () {
      return {
        dialog: false,
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
        this.dialog = false;
        this.$emit('order-charge-created');
      },
      orderChargeUpdated () {
        this.dialog = false;
        this.$emit('order-charge-updated');
      },
      editOrderCharge (orderChargeId) {
        this.orderChargeId = orderChargeId;
        this.dialog = true;
      },
      cancel () {
        this.orderChargeId = null;
        this.dialog = false;
      }
    }
  };
</script>
