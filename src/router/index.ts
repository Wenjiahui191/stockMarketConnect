import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: () => import("@/pages/StocksList.vue"),
  },
  {
    path: "/stocks/:id",
    name: "StockDetail",
    component: () => import("@/pages/StockDetail.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
