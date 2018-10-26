export default [
  {
    path: "/orders",
    name: "orders",
    component: () =>
      import(/* webpackChunkName: "orders" */ "./views/List.vue")
  },
  {
    path: "/orders/new",
    name: "new_order",
    component: () =>
      import(/* webpackChunkName: "orders" */ "./views/New.vue")
  },
  {
    path: "/orders/:id",
    name: "order",
    component: () =>
      import(/* webpackChunkName: "orders" */ "./views/Edit.vue")
  }
];
