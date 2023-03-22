import HomeViewVue from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewVue
    },
    {
      path: "/catalog",
      name: "catalog",
      component: HomeViewVue,
    },
    {
      path: "/progress",
      name: "my progress",
      component: HomeViewVue,
    },
    {
      path: "/profile",
      name: "profile",
      component: HomeViewVue,
    },
  ]
})

export default router
