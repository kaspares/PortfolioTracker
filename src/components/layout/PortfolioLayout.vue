<script setup lang="ts">
import { usePortfolioStore } from '@/stores/portfolio'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const portfolioStore = usePortfolioStore()
const route = useRoute()
const portfolioId = route.params.portfolioId as string

onMounted(() => {
  portfolioStore.fetchPortfolioById(portfolioId)
})

const navItems = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
  },
  {
    path: 'items',
    label: 'Positions',
    icon: 'M16 20V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v16M2 10h20M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z',
  },
  {
    path: 'signals',
    label: 'Signals',
    icon: 'M22 7l-8.5 8.5-4-4L2 17M16 7h6v6',
  },
  {
    path: 'notifications',
    label: 'Notifications',
    icon: 'M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 003.4 0',
  },
  {
    path: 'settings',
    label: 'Settings',
    icon: 'M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2zM12 15a3 3 0 100-6 3 3 0 000 6z',
  },
]
</script>

<template>
  <div class="flex h-screen bg-base-300">
    <!-- Sidebar -->
    <aside class="w-64 bg-base-200 border-r border-base-content/5 flex flex-col shrink-0">
      <!-- Logo -->
      <div class="px-5 py-5 border-b border-base-content/5">
        <router-link to="/portfolios" class="flex items-center gap-3 group">
          <div class="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4.5 h-4.5 text-primary">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              <polyline points="16 7 22 7 22 13"/>
            </svg>
          </div>
          <span class="font-semibold tracking-tight text-base-content group-hover:text-primary transition-colors">
            PortfolioTracker
          </span>
        </router-link>
      </div>

      <!-- Portfolio name -->
      <div class="px-5 py-4 border-b border-base-content/5">
        <p class="text-xs font-medium text-base-content/40 uppercase tracking-wider mb-1">Portfolio</p>
        <p class="text-sm font-semibold text-base-content truncate">
          {{ portfolioStore.currentPortfolio?.name ?? 'Loading...' }}
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="`/portfolio/${portfolioId}/${item.path}`"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                 text-base-content/60 hover:text-base-content hover:bg-base-300/60 transition-all duration-150"
          active-class="!text-primary !bg-primary/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 shrink-0">
            <path :d="item.icon" />
          </svg>
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Bottom -->
      <div class="px-3 py-4 border-t border-base-content/5 space-y-1">
        <div class="flex items-center gap-3 px-3 py-2.5">
          <ThemeToggle />
          <span class="text-sm text-base-content/40">Theme</span>
        </div>
        <router-link
          to="/portfolios"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                 text-base-content/40 hover:text-base-content hover:bg-base-300/60 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          All Portfolios
        </router-link>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>
