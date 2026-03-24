<script setup lang="ts">
import LineChart from '@/components/ui/LineChart.vue'
import type { ChartSeries } from '@/types'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const ticker = computed(() => (route.params.ticker as string)?.toUpperCase() ?? 'AAPL')

// TODO: pobierac z Yahoo Finance przez backend
const priceHistory: ChartSeries[] = [
  {
    label: 'AAPL',
    points: [
      { date: 'Dec 1', value: 189.43 },
      { date: 'Dec 18', value: 195.71 },
      { date: 'Jan 6', value: 192.53 },
      { date: 'Jan 15', value: 198.11 },
      { date: 'Feb 3', value: 185.04 },
      { date: 'Feb 14', value: 187.68 },
      { date: 'Mar 1', value: 178.22 },
      { date: 'Mar 11', value: 170.12 },
      { date: 'Mar 19', value: 174.17 },
    ],
  },
]
</script>

<template>
  <div>
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-1">
        <router-link :to="`/portfolio/${route.params.portfolioId}/items`"
          class="text-base-content/40 hover:text-base-content transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </router-link>
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
          {{ ticker.slice(0, 2) }}
        </div>
        <div>
          <h1 class="text-2xl font-bold text-base-content">{{ ticker }}</h1>
          <p class="text-sm text-base-content/40">Apple Inc.</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div class="bg-base-200 border border-base-content/5 rounded-xl p-4">
        <p class="text-xs text-base-content/40 uppercase tracking-wider mb-1">Current Price</p>
        <p class="text-lg font-bold text-base-content">$174.17</p>
      </div>
      <div class="bg-base-200 border border-base-content/5 rounded-xl p-4">
        <p class="text-xs text-base-content/40 uppercase tracking-wider mb-1">Your Avg. Buy</p>
        <p class="text-lg font-bold text-base-content">$162.30</p>
      </div>
      <div class="bg-base-200 border border-base-content/5 rounded-xl p-4">
        <p class="text-xs text-base-content/40 uppercase tracking-wider mb-1">Quantity</p>
        <p class="text-lg font-bold text-base-content">15</p>
      </div>
      <div class="bg-base-200 border border-base-content/5 rounded-xl p-4">
        <p class="text-xs text-base-content/40 uppercase tracking-wider mb-1">P&L</p>
        <p class="text-lg font-bold text-emerald-400">+$178.05</p>
      </div>
    </div>

    <div class="mb-6">
      <LineChart
        title="Price History"
        :series="priceHistory"
        value-prefix="$"
        height="h-80"
      >
        <template #actions>
          <div class="flex gap-1">
            <button class="px-2.5 py-1 text-xs rounded-md text-base-content/40 hover:text-base-content/60 hover:bg-base-300/50 transition-colors">1W</button>
            <button class="px-2.5 py-1 text-xs rounded-md text-base-content/40 hover:text-base-content/60 hover:bg-base-300/50 transition-colors">1M</button>
            <button class="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium">3M</button>
            <button class="px-2.5 py-1 text-xs rounded-md text-base-content/40 hover:text-base-content/60 hover:bg-base-300/50 transition-colors">1Y</button>
            <button class="px-2.5 py-1 text-xs rounded-md text-base-content/40 hover:text-base-content/60 hover:bg-base-300/50 transition-colors">ALL</button>
          </div>
        </template>
      </LineChart>
    </div>
  </div>
</template>
