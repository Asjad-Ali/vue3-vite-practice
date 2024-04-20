import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Pages/Home.vue'
import Dashboard from '../Pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  }
]


const router = createRouter({ history: createWebHistory(), routes })

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('user') ? true : false
//   if (to.name == 'home' && isAuthenticated) {
//     next({ path: '/dashboard' });
//   }
//   else if (to.name !== 'home' && !isAuthenticated) {
//     next({ path: '/' });
//   } else {
//     next()
//   }
// })

export default router
