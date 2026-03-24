<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import ThemeToggle from './ThemeToggle.vue'

const authStore = useAuthStore()
</script>

<template>
  <nav class="navbar bg-base-200/80 backdrop-blur-md border-b border-base-content/5 sticky top-0 z-50 px-6">
    <div class="flex-1">
      <router-link to="/portfolios" class="flex items-center gap-3 group">
        <div class="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
            <polyline points="16 7 22 7 22 13"/>
          </svg>
        </div>
        <span class="text-lg font-semibold tracking-tight text-base-content group-hover:text-primary transition-colors">
          PortfolioTracker
        </span>
      </router-link>
    </div>
    <div class="flex-none flex items-center gap-3">
      <ThemeToggle />
      <span v-if="authStore.userEmail" class="text-sm text-base-content/60">
        {{ authStore.userEmail }}
      </span>
      <div class="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 text-primary">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </div>
  </nav>
</template>
