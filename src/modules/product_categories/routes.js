export default [
  {
    path: "/product_categories",
    name: "product_categories",
    component: () =>
      import(/* webpackChunkName: "product_categories" */ "./views/List.vue")
  },
  {
    path: "/product_categories/new",
    name: "new_product_category",
    component: () =>
      import(/* webpackChunkName: "product_categories" */ "./views/New.vue")
  },
  {
    path: "/product_categories/:id",
    name: "product_category",
    component: () =>
      import(/* webpackChunkName: "product_categories" */ "./views/Edit.vue")
  }
];
