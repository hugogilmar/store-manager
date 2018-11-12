export default [
  {
    path: "/reports/store",
    name: "store_report",
    component: () =>
      import(/* webpackChunkName: "reports" */ "./views/Store.vue")
  },
  {
    path: "/reports/product",
    name: "product_report",
    component: () =>
      import(/* webpackChunkName: "reports" */ "./views/Product.vue")
  },
  {
    path: "/reports/productCategory",
    name: "productCategory_report",
    component: () =>
      import(/* webpackChunkName: "reports" */ "./views/ProductCategory.vue")
  },
  {
    path: "/reports/paymentMethod",
    name: "paymentMethod_report",
    component: () =>
      import(/* webpackChunkName: "reports" */ "./views/PaymentMethod.vue")
  },
  {
    path: "/reports/charge",
    name: "charge_report",
    component: () =>
      import(/* webpackChunkName: "reports" */ "./views/Charge.vue")
  }
];
