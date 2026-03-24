<script setup lang="ts">
import PortfolioSummaryCard from '@/components/portfolio/portfolioSummaryCard.vue'
import TheHeader from '@/components/ui/TheHeader.vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { onMounted } from 'vue'

const portfolioStore = usePortfolioStore()

onMounted(() => {
  portfolioStore.fetchPortfoliosSummaries()
})
</script>

<template>
  <TheHeader />
  <div class="max-w-6xl mx-auto px-6 py-10">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-base-content">My Portfolios</h1>
        <p class="text-base-content/50 mt-1">Select a portfolio to view details</p>
      </div>
      <button class="btn btn-primary gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        New Portfolio
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <PortfolioSummaryCard
        v-for="p in portfolioStore.portfolios"
        :key="p.id"
        :portfolio="p"
      />
    </div>

    <div v-if="portfolioStore.portfolios.length === 0"
      class="text-center py-20">
      <div class="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-8 h-8 text-base-content/30">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-base-content/60">No portfolios yet</h3>
      <p class="text-sm text-base-content/40 mt-1">Create your first portfolio to start tracking</p>
    </div>
  </div>
</template>
