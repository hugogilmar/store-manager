import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import productsRoutes from "./modules/products/routes";
import productCategoriesRoutes from "./modules/product_categories/routes";
import storesRoutes from "./modules/stores/routes";
import paymentMethodsRoutes from "./modules/payment_methods/routes";
import employeesRoutes from "./modules/employees/routes";
import ordersRoutes from "./modules/orders/routes";

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
  paymentMethodsRoutes,
  employeesRoutes,
  ordersRoutes
);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});

export default router;
