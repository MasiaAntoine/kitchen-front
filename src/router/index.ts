import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import AuthView from '../views/AuthView/AuthView.vue'
import ShoppingListView from '../views/ShoppingListView/ShoppingListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/shopping-list',
      name: 'Shopping-list',
      component: ShoppingListView,
    },
    {
      path: '/login',
      name: 'Login',
      component: AuthView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

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
