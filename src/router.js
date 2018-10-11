import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import productsRoutes from "./modules/products/routes";
import productCategoriesRoutes from "./modules/product_categories/routes";
import storesRoutes from "./modules/stores/routes";

Vue.use(Router);

const appRoutes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

const routes = appRoutes.concat(
  productsRoutes,
  productCategoriesRoutes,
  storesRoutes,
);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
  routes: routes
});
