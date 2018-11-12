<template>
  <v-navigation-drawer
    app
    clipped
    :value="drawerOpen"
  >
    <v-responsive :aspect-ratio="16/9" class="secondary white--text">
      <v-layout pa-4 column fill-height>
        <v-spacer></v-spacer>
        <v-flex shrink>
          <div class="subheading">{{ currentUser.name }}</div>
          <div class="body-1">{{ currentUser.realm }}</div>
        </v-flex>
      </v-layout>
    </v-responsive>
    <v-list dense>
      <v-list-group
        prepend-icon="menu"
        v-for="(group, i) in groups"
        :key="i"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>
            {{ group.title }}
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="(item, j) in items(group.group)"
          :key="j"
          @click="navigateTo(item)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-group
        prepend-icon="menu"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>{{ $t('navigation.groups.settings') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="darkThemeToggle">
          <v-list-tile-action>
            <v-checkbox
              :value="darkTheme"
            ></v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('navigation.links.darkMode') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-tile
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
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Navigation',
    data () {
      return {
        groups: [
          {
            icon: 'menu',
            title: this.$t('navigation.groups.cruds'),
            group: 'cruds'
          },
          {
            icon: 'show_chart',
            title: this.$t('navigation.groups.reports'),
            group: 'reports'
          }
        ],
        links: [
          {
            icon: 'store',
            title: this.$t('navigation.links.stores'),
            path: '/stores',
            group: 'cruds'
          },
          {
            icon: 'bookmark',
            title: this.$t('navigation.links.productCategories'),
            path: '/product_categories',
            group: 'cruds'
          },
          {
            icon: 'credit_card',
            title: this.$t('navigation.links.paymentMethods'),
            path: '/payment_methods',
            group: 'cruds'
          },
          {
            icon: 'shopping_cart',
            title: this.$t('navigation.links.products'),
            path: '/products',
            group: 'cruds'
          },
          {
            icon: 'person',
            title: this.$t('navigation.links.employees'),
            path: '/employees',
            group: 'cruds'
          },
          {
            icon: 'attach_money',
            title: this.$t('navigation.links.charges'),
            path: '/charges',
            group: 'cruds'
          },
          {
            icon: 'place',
            title: this.$t('navigation.links.locations'),
            path: '/locations',
            group: 'cruds'
          },
          {
            icon: 'list',
            title: this.$t('navigation.links.orders'),
            path: '/orders',
            group: 'cruds'
          },
          {
            icon: 'store',
            title: this.$t('navigation.links.storesReport'),
            path: '/reports/store',
            group: 'reports'
          },
          {
            icon: 'bookmark',
            title: this.$t('navigation.links.productCategoriesReport'),
            path: '/reports/productCategory',
            group: 'reports'
          },
          {
            icon: 'attach_money',
            title: this.$t('navigation.links.paymentMethodsReport'),
            path: '/reports/paymentMethod',
            group: 'reports'
          },
          {
            icon: 'shopping_cart',
            title: this.$t('navigation.links.productsReport'),
            path: '/reports/product',
            group: 'reports'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'currentUser',
        'drawerOpen',
        'darkTheme'
      ])
    },
    methods: {
      ...mapActions([
        'logout',
        'darkThemeToggle'
      ]),
      items (group) {
        return this.links.filter(function (link) {
          return link.group == group
        });
      },
      navigateTo: function (item) {
        this.$router.push({ path: item.path });
      }
    }
  }
</script>
