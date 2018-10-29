import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import Home from './views/Home.vue';
import productsRoutes from './modules/products/routes';
import productCategoriesRoutes from './modules/product_categories/routes';
import storesRoutes from './modules/stores/routes';
import paymentMethodsRoutes from './modules/payment_methods/routes';
import employeesRoutes from './modules/employees/routes';
import ordersRoutes from './modules/orders/routes';
import sessionsRoutes from './modules/sessions/routes';

Vue.use(Router);

const appRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
];

const routes = appRoutes.concat(
  productsRoutes,
  productCategoriesRoutes,
  storesRoutes,
  paymentMethodsRoutes,
  employeesRoutes,
  ordersRoutes,
  sessionsRoutes
);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
})

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
