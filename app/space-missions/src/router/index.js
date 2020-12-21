import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/astronauts",
    name: "Astronauts",
    component: () =>
      import(/* webpackChunkName: "astronauts" */ "../views/Astronauts.vue")
  },
  {
    path: "/missions",
    name: "Missions",
    component: () =>
      import(/* webpackChunkName: "missions" */ "../views/Missions.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
