import Store from './views/Store.vue';
import Product from './views/Product.vue';
import ProductCategory from './views/ProductCategory.vue';
import PaymentMethod from './views/PaymentMethod.vue';
import Charge from './views/Charge.vue';

export default [
  {
    path: "/reports/store",
    name: "store_report",
    component: Store
  },
  {
    path: "/reports/product",
    name: "product_report",
    component: Product
  },
  {
    path: "/reports/productCategory",
    name: "productCategory_report",
    component: ProductCategory
  },
  {
    path: "/reports/paymentMethod",
    name: "paymentMethod_report",
    component: PaymentMethod
  },
  {
    path: "/reports/charge",
    name: "charge_report",
    component: Charge
  }
];
