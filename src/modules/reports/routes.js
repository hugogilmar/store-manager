export default [
  {
    path: "/reports",
    name: "reports",
    component: () =>
      import(/* webpackChunkName: "reports" */ "./views/List.vue")
  }
];
