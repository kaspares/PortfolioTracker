<script setup lang="ts">
import SignalItem from './SignalItem.vue'
import type { Signals } from '@/types/index'

const props = defineProps<{
  signals: Signals[]
}>()
</script>

<template>
  <div class="bg-base-200 border border-base-content/5 rounded-xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-sm font-medium text-base-content/40 uppercase tracking-wider">Recent Signals</h2>
      <span class="text-xs text-base-content/30">{{ signals.length }} total</span>
    </div>
    <div class="space-y-3">
      <SignalItem
        v-for="signal in signals"
        :key="signal.id"
        :symbol="signal.stock.ticker"
        :action="signal.result"
        :message="signal.describe"
        severity="moderate"
        timestamp="Feb 27"
      />
    </div>
  </div>
</template>
