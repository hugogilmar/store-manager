import List from './views/List.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/products",
    name: "products",
    component: List
  },
  {
    path: "/products/new",
    name: "new_product",
    component: New
  },
  {
    path: "/products/:id",
    name: "product",
    component: Edit
  }
];
