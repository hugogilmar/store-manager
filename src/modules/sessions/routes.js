export default [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "sessions" */ "./views/New.vue")
  }
];
