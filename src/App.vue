<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click.stop="navigateTo(item)"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'shopping_cart',
          title: this.$t('navigation.products'),
          path: '/products'
        },
        {
          icon: 'bookmark',
          title: this.$t('navigation.productCategories'),
          path: '/product_categories'
        },
        {
          icon: 'store',
          title: this.$t('navigation.stores'),
          path: '/stores'
        },
        {
          icon: 'attach_money',
          title: this.$t('navigation.paymentMethods'),
          path: '/payment_methods'
        },
        {
          icon: 'person',
          title: this.$t('navigation.employees'),
          path: '/employees'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: this.$t('app.name')
    }
  },
  methods: {
    navigateTo: function (item) {
      this.$router.push({ path: item.path });
    }
  }
}
</script>
