import List from './views/List.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/charges",
    name: "charges",
    component: List
  },
  {
    path: "/charges/new",
    name: "new_charge",
    component: New
  },
  {
    path: "/charges/:id",
    name: "charge",
    component: Edit
  }
];
