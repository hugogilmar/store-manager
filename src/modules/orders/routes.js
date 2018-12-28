import List from './views/List.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/orders",
    name: "orders",
    component: List
  },
  {
    path: "/orders/new",
    name: "new_order",
    component: New
  },
  {
    path: "/orders/:id",
    name: "order",
    component: Edit
  }
];
