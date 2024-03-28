import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Pages/Home.vue'
import Dashboard from '../Pages/Dashboard.vue'
import App from '../Pages/App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: "HomeLayout"
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      layout: "DefaultLayout"
    }
  },
  {
    path: '/app',
    name: 'app',
    component: App,
    meta: {
      layout: "AppLayout"
    }
  },
]


const router = createRouter({ history: createWebHistory(), routes })

export default router
