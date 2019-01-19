import Vue from 'vue';
import Vuex from 'vuex';
import baseModule from './base';
import productsModule from '../modules/products/states';
import productCategoriesModule from '../modules/product_categories/states';
import storesModule from '../modules/stores/states';
import paymentMethodsModule from '../modules/payment_methods/states';
import employeesModule from '../modules/employees/states';
import chargesModule from '../modules/charges/states';
import ordersModule from '../modules/orders/states';
import locationsModule from '../modules/locations/states';
import reportsModule from '../modules/reports/states';
import sessionsModule from '../modules/sessions/states';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    base: baseModule,
    products: productsModule,
    productCategories: productCategoriesModule,
    store: storesModule,
    paymentMethods: paymentMethodsModule,
    employees: employeesModule,
    charges: chargesModule,
    orders: ordersModule,
    locations: locationsModule,
    reports: reportsModule,
    sessions: sessionsModule
  }
});

export default store;
