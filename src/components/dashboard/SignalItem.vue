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

const containerClass = isSell
  ? 'border-red-600 bg-base-300'
  : 'border-emerald-600 bg-base-300'

const badgeClass = isSell
  ? 'badge-error'
  : 'badge-success'

const iconColor = isSell
  ? 'text-red-600 '
  : 'text-emerald-600'

</script>

<template>
  <div
    class="flex items-center justify-between p-4 rounded-xl border transition hover:shadow-sm"
    :class="containerClass"
  >
    <!-- LEFT SIDE -->
    <div class="flex items-center gap-4 min-w-0">
      
      <!-- Icon box -->
      <div class="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0" :class="containerClass">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="w-5 h-5"
          :class="iconColor"
        >
          <path v-if="isSell" d="M3 7l6 6 4-4 8 8" />
          <path v-else d="M3 17l6-6 4 4 8-8" />
        </svg>
      </div>

      <!-- Text content -->
      <div class="min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-semibold">{{ symbol }}</span>
          <span class="badge badge-sm" :class="badgeClass">
            {{ action }}
          </span>
        </div>

        <div class="text-sm text-base-content/70 truncate">
          {{ message }}
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="text-right shrink-0">
      <div class="badge badge-ghost badge-sm capitalize">
        {{ severity }}
      </div>
      <div class="text-xs text-base-content/60 mt-2">
        {{ timestamp }}
      </div>
    </div>
  </div>
</template>