<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { useThemeStore } from '@/stores/theme'

ChartJS.register(ArcElement, Tooltip, Legend)

const themeStore = useThemeStore()

type Position = {
  category: string
  value: number
}

const props = defineProps<{
  positions: Position[]
}>()

const totalsByCategory = computed(() => {
  const map = new Map<string, number>()
  for (const p of props.positions) {
    map.set(p.category, (map.get(p.category) ?? 0) + p.value)
  }
  return map
})

const total = computed(() =>
  Array.from(totalsByCategory.value.values()).reduce((a, b) => a + b, 0)
)

const labels = computed(() => Array.from(totalsByCategory.value.keys()))
const dataValues = computed(() => Array.from(totalsByCategory.value.values()))

const chartColors = [
  'rgba(16, 185, 129, 0.85)',
  'rgba(59, 130, 246, 0.85)',
  'rgba(245, 158, 11, 0.85)',
  'rgba(239, 68, 68, 0.85)',
  'rgba(139, 92, 246, 0.85)',
  'rgba(6, 182, 212, 0.85)',
  'rgba(236, 72, 153, 0.85)',
]

const themeColors = computed(() => themeStore.isDark() ? {
  legend: 'rgba(255,255,255,0.6)',
  tooltipBg: 'rgba(20,20,30,0.95)',
  tooltipTitle: 'rgba(255,255,255,0.9)',
  tooltipBody: 'rgba(255,255,255,0.7)',
  tooltipBorder: 'rgba(255,255,255,0.1)',
  segmentBorder: 'rgba(0,0,0,0.3)',
  hoverBorder: 'rgba(255,255,255,0.3)',
} : {
  legend: 'rgba(0,0,0,0.5)',
  tooltipBg: 'rgba(255,255,255,0.95)',
  tooltipTitle: 'rgba(0,0,0,0.8)',
  tooltipBody: 'rgba(0,0,0,0.6)',
  tooltipBorder: 'rgba(0,0,0,0.08)',
  segmentBorder: 'rgba(255,255,255,0.8)',
  hoverBorder: 'rgba(0,0,0,0.2)',
})

const chartData = computed<ChartData<'pie'>>(() => ({
  labels: labels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: chartColors,
      borderColor: themeColors.value.segmentBorder,
      borderWidth: 1,
      hoverBorderColor: themeColors.value.hoverBorder,
      hoverBorderWidth: 2,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'pie'>>(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: themeColors.value.legend,
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: themeColors.value.tooltipBg,
      titleColor: themeColors.value.tooltipTitle,
      bodyColor: themeColors.value.tooltipBody,
      borderColor: themeColors.value.tooltipBorder,
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
      callbacks: {
        label: (ctx) => {
          const value = ctx.parsed
          const percent = ((value / total.value) * 100).toFixed(1)
          return `${ctx.label}: ${percent}%`
        },
      },
    },
  },
}))
</script>

<template>
  <div class="bg-base-200 border border-base-content/5 rounded-xl p-6">
    <h2 class="text-sm font-medium text-base-content/40 uppercase tracking-wider mb-6">Portfolio Allocation</h2>
    <div class="max-w-xs mx-auto">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
