export default [
  {
    path: "/orders",
    name: "orders",
    component: () =>
      import(/* webpackChunkName: "orders-list" */ "./views/List.vue")
  },
  {
    path: "/orders/new",
    name: "new_order",
    component: () =>
      import(/* webpackChunkName: "orders-new" */ "./views/New.vue")
  },
  {
    path: "/orders/:id",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "orders-edit" */ "./views/Edit.vue")
  }
];
