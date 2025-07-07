import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home', // 默认重定向到 home
  },
  {
    path: '/home',
    name: 'home',
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
