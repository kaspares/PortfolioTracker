import Dashboard from '@/views/dashboard.vue'
import Settings from '@/views/settings.vue'
import Signals from '@/views/signals.vue'
import Notifications from '@/views/notifications.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/auth.vue'
import Landing from '@/views/landing.vue'
import PortfolioListView from '@/views/portfolioListView.vue'
import PortfolioItems from '@/views/portfolioItems.vue'
import PortfolioLayout from '@/components/layout/PortfolioLayout.vue'
import StockDetail from '@/views/stockDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Landing,
    },
    {
      path: '/auth',
      component: Auth
    },
    {
      path: '/portfolios',
      component: PortfolioListView
    },
    {
      path: '/portfolio/:portfolioId',
      component: PortfolioLayout,
      children: [
        { path: 'dashboard', component: Dashboard},
        { path: 'items', component: PortfolioItems},
        { path: 'signals', component: Signals},
        { path: 'notifications', component: Notifications},
        { path: 'settings', component: Settings},
        { path: 'stock/:ticker', component: StockDetail},
      ]
    },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
