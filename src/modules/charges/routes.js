export default [
  {
    path: "/charges",
    name: "charges",
    component: () =>
      import(/* webpackChunkName: "charges" */ "./views/List.vue")
  },
  {
    path: "/charges/new",
    name: "new_charge",
    component: () =>
      import(/* webpackChunkName: "charges" */ "./views/New.vue")
  },
  {
    path: "/charges/:id",
    name: "charge",
    component: () =>
      import(/* webpackChunkName: "charges" */ "./views/Edit.vue")
  }
];
