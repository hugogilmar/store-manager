<template>
  <v-app>
    <v-navigation-drawer
      persistent
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
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          value="true"
          @click.stop="logout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t('navigation.logout') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="authenticationToken"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'App',
    data () {
      return {
        clipped: false,
        drawer: false,
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
          },
          {
            icon: 'list',
            title: this.$t('navigation.orders'),
            path: '/orders'
          }
        ],
        title: this.$t('app.name')
      }
    },
    computed: {
      ...mapGetters([
        'authenticationToken'
      ])
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      navigateTo: function (item) {
        this.$router.push({ path: item.path });
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
