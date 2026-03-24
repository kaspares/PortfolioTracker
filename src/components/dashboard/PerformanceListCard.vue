<script setup lang="ts">
import type { MoverType, PerfomanceItem } from '@/types'
import PerformanceListItem from './PerformanceListItem.vue'

const props = defineProps<{
  type: MoverType
  items: PerfomanceItem[]
}>()

const isGainers = props.type === 'Gainers'
</script>

<template>
  <div class="bg-base-200 border border-base-content/5 rounded-xl p-6">
    <div class="flex items-center gap-2 mb-5">
      <div class="w-7 h-7 rounded-lg flex items-center justify-center"
        :class="isGainers ? 'bg-emerald-500/10' : 'bg-rose-500/10'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5"
          :class="isGainers ? 'text-emerald-500' : 'text-rose-500'">
          <path v-if="isGainers" d="M7 17L17 7M7 7h10v10" />
          <path v-else d="M7 7l10 10M17 7v10H7" />
        </svg>
      </div>
      <h2 class="text-sm font-medium text-base-content/40 uppercase tracking-wider">Top {{ type }}</h2>
    </div>
    <div class="space-y-4">
      <PerformanceListItem
        v-for="item in items"
        :key="item.ticker"
        :item="item"
        :variant="isGainers ? 'up' : 'down'"
      />
    </div>
  </div>
</template>
