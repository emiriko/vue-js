import HomeViewVue from '@/views/HomeView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import NotFoundViewVue from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProfileViewVue from '@/views/ProfileView.vue'
import CatalogViewVue from '@/views/CatalogView.vue'
import CreateSeriesViewVue from '@/views/CreateSeriesView.vue'
import UpdateSeriesView from '@/views/UpdateSeriesView.vue'
import DetailView from "@/views/DetailView.vue";
import ReviewAllView from "@/views/ReviewAllView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RegisterViewVue
    },
    {
      path: "/catalog",
      name: "catalog",
      component: CatalogViewVue,
      children: [
        {
          path: '/catalog/search',
          name: 'search',
          component: CatalogViewVue
        },
      ]
    },
    {
      path: '/catalog/create',
      name: 'create',
      component: CreateSeriesViewVue
    },
    {
      path: '/catalog/update/:type/:id',
      name: 'update',
      component: UpdateSeriesView
    },
    {
      path: "/catalog/:id",
      name: "detail",
      component: DetailView,
    },
    {
      path: "/catalog/review/:id",
      name: "review",
      component: ReviewAllView,
    },
    {
      path: "/progress",
      name: "my progress",
      component: HomeViewVue,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileViewVue,
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
  ],
  scrollBehavior() {
      return new Promise((resolve) => {
        resolve({ top: 0, left: 0, behavior: 'smooth' })
      })
  },
})

export default router
