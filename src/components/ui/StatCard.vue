<script setup lang="ts">
const props = defineProps<{
  title: string
  value: number | undefined
  symbol?: string
  describe?: string
  trend?: 'up' | 'down' | 'neutral'
}>()

const displayValue = () => {
  if (props.value === undefined || props.value === null) return '--'
  return props.value.toLocaleString('en-US', { maximumFractionDigits: 2 })
}
</script>

<template>
  <div class="bg-base-200 border border-base-content/5 rounded-xl p-5 flex-1 min-w-0">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-medium text-base-content/40 uppercase tracking-wider">{{ title }}</span>
      <div v-if="trend" class="w-6 h-6 rounded-md flex items-center justify-center"
        :class="trend === 'up' ? 'bg-emerald-500/10' : trend === 'down' ? 'bg-rose-500/10' : 'bg-base-300'">
        <svg v-if="trend === 'up'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-emerald-500">
          <path d="M7 17l5-5 5 5M7 7l5 5 5-5"/>
        </svg>
        <svg v-else-if="trend === 'down'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-rose-500">
          <path d="M7 7l5 5 5-5M7 17l5-5 5 5"/>
        </svg>
      </div>
    </div>
    <div class="text-2xl font-bold text-base-content">
      {{ displayValue() }}<span v-if="symbol" class="text-base font-medium text-base-content/50 ml-1">{{ symbol }}</span>
    </div>
    <p v-if="describe" class="text-xs text-base-content/40 mt-1">{{ describe }}</p>
  </div>
</template>
