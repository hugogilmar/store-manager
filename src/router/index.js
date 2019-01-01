import Vue from 'vue';
import Router from 'vue-router';

import baseRoutes from './base';
import productsRoutes from '../modules/products/routes';
import productCategoriesRoutes from '../modules/product_categories/routes';
import storesRoutes from '../modules/stores/routes';
import paymentMethodsRoutes from '../modules/payment_methods/routes';
import employeesRoutes from '../modules/employees/routes';
import chargesRoutes from '../modules/charges/routes';
import ordersRoutes from '../modules/orders/routes';
import locationsRoutes from '../modules/locations/routes';
import reportsRoutes from '../modules/reports/routes';
import sessionsRoutes from '../modules/sessions/routes';
import store from '../store/';

Vue.use(Router);

const routes = baseRoutes.concat(
  productsRoutes,
  productCategoriesRoutes,
  storesRoutes,
  paymentMethodsRoutes,
  employeesRoutes,
  chargesRoutes,
  ordersRoutes,
  reportsRoutes,
  locationsRoutes,
  sessionsRoutes
);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    '/login'
  ];

  const authenticationRequired = !publicPages.includes(to.path);
  const authenticationToken = store.state.sessions.authenticationToken;

  if (authenticationRequired && !authenticationToken) {
    return next('/login');
  }

  next();
});

export default router;
