export default [
  {
    path: "/stores",
    name: "stores",
    component: () =>
      import(/* webpackChunkName: "stores" */ "./views/List.vue")
  },
  {
    path: "/stores/new",
    name: "new_store",
    component: () =>
      import(/* webpackChunkName: "stores" */ "./views/New.vue")
  },
  {
    path: "/stores/:id",
    name: "store",
    component: () =>
      import(/* webpackChunkName: "stores" */ "./views/Edit.vue")
  }
];
