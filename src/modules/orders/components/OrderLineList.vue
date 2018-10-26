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
      avatar
      @click="editOrderLine(orderLine.id)"
    >
      <v-list-tile-action>
        <v-icon>star</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ orderLine.product.name }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ orderLine.quantity }} x {{ orderLine.price | currency }} = {{ orderLine.total | currency }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="orderLine.avatar">
        <img :src="orderLine.avatar">
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
          {{ $t('dialog.add.title', { entity: $tc('entities.order', 1) }) }}
        </v-card-title>
        <v-card-text>
          {{ $t('dialog.add.message', { entity: $tc('entities.order', 1) }) }}
        </v-card-text>
        <v-card-text>
          <order-line-form
            :order-id="orderId"
            :order-line-id="orderLineId"
            @order-line-created="orderLineCreated"
            @order-line-updated="orderLineUpdated"
            @cancel="cancel"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
  import OrderLineForm from './OrderLineForm.vue';

  export default {
    name: 'OrderLineList',
    components: {
      'order-line-form': OrderLineForm
    },
    data () {
      return {
        dialog: false,
        orderLineId: null
      }
    },
    props: [
      'orderId',
      'orderLines'
    ],
    methods: {
      orderLineCreated () {
        this.dialog = false;
        this.$emit('order-line-created');
      },
      orderLineUpdated () {
        this.dialog = false;
        this.$emit('order-line-updated');
      },
      editOrderLine (orderLineId) {
        this.orderLineId = orderLineId;
        this.dialog = true;
      },
      cancel () {
        this.orderLineId = null;
        this.dialog = false;
      }
    }
  };
</script>
