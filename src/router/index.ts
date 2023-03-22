import HomeViewVue from '@/views/HomeView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import NotFoundViewVue from '@/views/NotFoundView.vue'
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
    {
      path: "/auth",
      children: [
        {
          path: "sign-in",
          name: "sign in",
          component: LoginViewVue
        },
        {
          path: "sign-up",
          name: "sign up",
          component: RegisterViewVue
        },
      ]
    },
    { 
      path: '/404', 
      component: NotFoundViewVue 
    },
    { 
      path: "/:catchAll(.*)",
      redirect: "/404" 
    },
  ]
})

export default router
