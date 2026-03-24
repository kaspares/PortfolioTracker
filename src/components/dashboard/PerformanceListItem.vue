<script setup lang="ts">
import type { PerfomanceItem } from '@/types'

const props = defineProps<{
  item: PerfomanceItem
  variant: 'up' | 'down'
}>()

const isUp = props.variant === 'up'
const sign = isUp ? '+' : ''
</script>

<template>
  <div class="flex items-center justify-between py-1">
    <div class="flex items-center gap-3 min-w-0">
      <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs"
        :class="isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'">
        {{ item.ticker.slice(0, 2) }}
      </div>
      <div class="min-w-0">
        <div class="font-semibold text-sm text-base-content leading-tight">{{ item.ticker }}</div>
        <div class="text-xs text-base-content/40 truncate">{{ item.name }}</div>
      </div>
    </div>

    <div class="text-right shrink-0 ml-4">
      <div class="text-sm font-semibold" :class="isUp ? 'text-emerald-400' : 'text-rose-400'">
        {{ sign }}{{ item.changePercent.toFixed(2) }}%
      </div>
      <div class="text-xs text-base-content/40">
        ${{ item.price.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}
      </div>
    </div>
  </div>
</template>
