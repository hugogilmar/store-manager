import List from './views/List.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/product_categories",
    name: "product_categories",
    component: List
  },
  {
    path: "/product_categories/new",
    name: "new_product_category",
    component: New
  },
  {
    path: "/product_categories/:id",
    name: "product_category",
    component: Edit
  }
];
