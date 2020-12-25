import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/astronauts",
    name: "Astronauts",
    component: () =>
      import(/* webpackChunkName: "astronauts" */ "../views/Astronauts.vue")
  },
  {
    path: "/",
    name: "Missions",
    component: () =>
      import(/* webpackChunkName: "missions" */ "../views/Missions.vue")
  },
  {
    path: "/astronaut/:id",
    name: "Missions",
    props: true,
    component: () =>
      import(/* webpackChunkName: "astronaut" */ "../views/Astrounat.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
