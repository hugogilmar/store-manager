import List from './views/List.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/payment_methods",
    name: "payment_methods",
    component: List
  },
  {
    path: "/payment_methods/new",
    name: "new_payment_method",
    component: New
  },
  {
    path: "/payment_methods/:id",
    name: "payment_method",
    component: Edit
  }
];
