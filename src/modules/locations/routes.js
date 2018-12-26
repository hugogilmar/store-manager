import List from './views/List.vue';
import New from './views/New.vue';
import Edit from './views/Edit.vue';

export default [
  {
    path: "/locations",
    name: "locations",
    component: List
  },
  {
    path: "/locations/new",
    name: "new_location",
    component: New
  },
  {
    path: "/locations/:id",
    name: "location",
    component: Edit
  }
];
