export default [
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName: "products" */ "./views/List.vue")
  },
  {
    path: "/products/new",
    name: "new_product",
    component: () =>
      import(/* webpackChunkName: "products" */ "./views/New.vue")
  },
  {
    path: "/products/:id",
    name: "product",
    component: () =>
      import(/* webpackChunkName: "products" */ "./views/Edit.vue")
  }
];
