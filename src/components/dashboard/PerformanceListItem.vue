<script setup lang="ts">
import type { PerfomanceItem } from '@/types';

const props = defineProps<{
    item: PerfomanceItem
    variant: 'up' | 'down'
}>()

const isUp = props.variant === 'up'

const iconBoxClass = isUp
  ? 'bg-emerald-600 text-emerald-600'
  : 'bg-rose-600 text-rose-600'

const changeClass = isUp
  ? 'text-emerald-600'
  : 'text-rose-600'

const sign = isUp ? '+' : ''
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4 min-w-0">
      <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" :class="iconBoxClass">
        <span class="text-lg font-bold">{{ isUp ? '↗' : '↘' }}</span>
      </div>

      <div class="min-w-0">
        <div class="font-semibold leading-5">{{ item.ticker }}</div>
        <div class="text-sm text-base-content/60 truncate">{{ item.name }}</div>
      </div>
    </div>

    <!-- Right -->
    <div class="text-right shrink-0">
      <div class="font-semibold" :class="changeClass">
        {{ sign }}{{ item.changePercent.toFixed(2) }}%
      </div>
      <div class="text-sm text-base-content/70">
        ${{ item.price.toLocaleString('en-US', { maximumFractionDigits: 3 }) }}
      </div>
    </div>
  </div>
</template>