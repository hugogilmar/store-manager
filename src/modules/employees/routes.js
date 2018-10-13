export default [
  {
    path: "/employees",
    name: "employees",
    component: () =>
      import(/* webpackChunkName: "employees" */ "./views/List.vue")
  },
  {
    path: "/employees/new",
    name: "new_employee",
    component: () =>
      import(/* webpackChunkName: "employees" */ "./views/New.vue")
  },
  {
    path: "/employees/:id",
    name: "employee",
    component: () =>
      import(/* webpackChunkName: "employees" */ "./views/Edit.vue")
  }
];
