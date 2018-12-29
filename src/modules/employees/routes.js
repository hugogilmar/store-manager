import List from './views/List.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/employees",
    name: "employees",
    component: List
  },
  {
    path: "/employees/new",
    name: "new_employee",
    component: New
  },
  {
    path: "/employees/:id",
    name: "employee",
    component: Edit
  }
];
