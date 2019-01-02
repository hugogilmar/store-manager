import List from './views/List.vue';
import New from './views/New.vue';
import Select from './views/Select.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/stores",
    name: "stores",
    component: List
  },
  {
    path: "/stores/new",
    name: "new_store",
    component: New
  },
  {
    path: "/stores/select",
    name: "select_store",
    component: Select
  },
  {
    path: "/stores/:id",
    name: "store",
    component: Edit
  }
];
