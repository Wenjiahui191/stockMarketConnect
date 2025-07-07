import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/Home', // 默认重定向到 Home
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
        children: [
          {
            path: 'hs',
            name: 'HsMarket',
            component: () => import('@/pages/HsMarket.vue'),
          },
          {
            path: 'hk',
            name: 'HkMarket',
            component: () => import('@/pages/HkMarket.vue'),
          },
          {
            path: 'us',
            name: 'UsMarket',
            component: () => import('@/pages/UsMarket.vue'),
          },
          {
            path: 'global',
            name: 'GlobalMarket',
            component: () => import('@/pages/GlobalMarket.vue'),
          },
        ],
      },
    ],
  },

  {
    path: '/stocks',
    name: 'Stocks',
    component: () => import('@/pages/StocksList.vue'),
  },
  // {
  //   path: "/stocks/:id",
  //   name: "StockDetail",
  //   component: () => import("@/pages/StockDetail.vue"),
  //   props: true,
  // },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
