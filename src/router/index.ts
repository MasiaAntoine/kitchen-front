import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import AuthView from '../views/AuthView/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: AuthView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const username = sessionStorage.getItem('username')
  const password = sessionStorage.getItem('password')

  if (!username || !password) {
    if (to.name !== 'Login') {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
