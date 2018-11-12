export default [
  {
    path: "/locations",
    name: "locations",
    component: () =>
      import(/* webpackChunkName: "locations" */ "./views/List.vue")
  },
  {
    path: "/locations/new",
    name: "new_location",
    component: () =>
      import(/* webpackChunkName: "locations" */ "./views/New.vue")
  },
  {
    path: "/locations/:id",
    name: "location",
    component: () =>
      import(/* webpackChunkName: "locations" */ "./views/Edit.vue")
  }
];
