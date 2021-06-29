import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import B2B from "../views/B2B.vue";
// import C2B from "../views/C2B.vue";
import RequestPayment from "../views/RequestPayment.vue";
import ManagePayments from "../views/ManagePayments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/B2B",
    name: "B2B",
    component: B2B,
  },
  // {
  //   path: "/C2B",
  //   name: "C2B",
  //   component: C2B,
  // },
  {
    path: "/RequestPayment",
    name: "RequestPayment",
    component: RequestPayment,
  },
  {
    path: "/ManagePayments",
    name: "ManagePayments",
    component: ManagePayments,
  },
  // {
  //   path: '/about',

  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
