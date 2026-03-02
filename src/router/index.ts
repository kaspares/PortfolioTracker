import Dashboard from '@/views/dashboard.vue'
import Portfolio from '@/views/portfolio.vue'
import Settings from '@/views/settings.vue'
import Signals from '@/views/signals.vue'
import Notifications from '@/views/notifications.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio,
    },
    {
      path: '/signals',
      name: 'signals',
      component: Signals,
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    }
  ],
})

export default router
