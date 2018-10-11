export default [
  {
    path: "/payment_methods",
    name: "payment_methods",
    component: () =>
      import(/* webpackChunkName: "payment_methods" */ "./views/List.vue")
  },
  {
    path: "/payment_methods/new",
    name: "new_payment_method",
    component: () =>
      import(/* webpackChunkName: "payment_methods" */ "./views/New.vue")
  },
  {
    path: "/payment_methods/:id",
    name: "payment_method",
    component: () =>
      import(/* webpackChunkName: "payment_methods" */ "./views/Edit.vue")
  }
];
