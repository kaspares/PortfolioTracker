<script setup lang="ts">
export type SignalAction = 'BUY' | 'SELL'

const props = defineProps<{
  symbol: string
  action: SignalAction
  message: string
  severity: 'low' | 'moderate' | 'high'
  timestamp: string
}>()

const isSell = props.action === 'SELL'
</script>

<template>
  <div class="flex items-center justify-between p-4 rounded-lg bg-base-300/50 border border-base-content/5 hover:border-base-content/10 transition-colors">
    <!-- Left -->
    <div class="flex items-center gap-3.5 min-w-0">
      <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        :class="isSell ? 'bg-rose-500/10' : 'bg-emerald-500/10'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4"
          :class="isSell ? 'text-rose-500' : 'text-emerald-500'">
          <path v-if="isSell" d="M7 7l10 10M17 7v10H7" />
          <path v-else d="M7 17L17 7M7 7h10v10" />
        </svg>
      </div>

      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-sm text-base-content">{{ symbol }}</span>
          <span class="px-1.5 py-0.5 text-[10px] font-bold rounded uppercase"
            :class="isSell ? 'bg-rose-500/15 text-rose-400' : 'bg-emerald-500/15 text-emerald-400'">
            {{ action }}
          </span>
        </div>
        <p class="text-xs text-base-content/40 truncate mt-0.5">{{ message }}</p>
      </div>
    </div>

    <!-- Right -->
    <div class="text-right shrink-0 ml-4">
      <span class="text-[10px] px-1.5 py-0.5 rounded bg-base-content/5 text-base-content/40 capitalize">
        {{ severity }}
      </span>
      <p class="text-[10px] text-base-content/30 mt-1">{{ timestamp }}</p>
    </div>
  </div>
</template>
