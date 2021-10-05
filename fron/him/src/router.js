import Vue from "vue";
import VueRouter from "vue-router";

import Index from "./pages/Index.vue";
import Users from "./pages/Users.vue";
import Message from "./pages/Message.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/message",
    component: Message,
  },
];

var router = new VueRouter({
  routes,
});
export default router;
