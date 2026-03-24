<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import type { ChartSeries } from '@/types'
import { useThemeStore } from '@/stores/theme'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend)

const themeStore = useThemeStore()

const props = withDefaults(defineProps<{
  title: string
  series: ChartSeries[]
  valuePrefix?: string
  valueSuffix?: string
  showLegend?: boolean
  height?: string
}>(), {
  valuePrefix: '',
  valueSuffix: '',
  showLegend: true,
  height: 'h-72',
})

const defaultColors = [
  'rgba(16, 185, 129, 1)',
  'rgba(59, 130, 246, 1)',
  'rgba(245, 158, 11, 1)',
  'rgba(139, 92, 246, 1)',
  'rgba(6, 182, 212, 1)',
  'rgba(236, 72, 153, 1)',
]

const gradientColors = [
  'rgba(16, 185, 129, 0.15)',
  'rgba(59, 130, 246, 0.15)',
  'rgba(245, 158, 11, 0.15)',
  'rgba(139, 92, 246, 0.15)',
  'rgba(6, 182, 212, 0.15)',
  'rgba(236, 72, 153, 0.15)',
]

const labels = computed(() =>
  props.series[0]?.points.map(p => p.date) ?? []
)

const isDark = () => themeStore.isDark()

const themeColors = computed(() => isDark() ? {
  text: 'rgba(255,255,255,0.35)',
  grid: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.06)',
  hoverBorder: 'rgba(255,255,255,0.8)',
  tooltipBg: 'rgba(15,15,25,0.95)',
  tooltipTitle: 'rgba(255,255,255,0.7)',
  tooltipBody: 'rgba(255,255,255,0.9)',
  tooltipBorder: 'rgba(255,255,255,0.08)',
  legend: 'rgba(255,255,255,0.5)',
} : {
  text: 'rgba(0,0,0,0.4)',
  grid: 'rgba(0,0,0,0.06)',
  border: 'rgba(0,0,0,0.08)',
  hoverBorder: 'rgba(255,255,255,1)',
  tooltipBg: 'rgba(255,255,255,0.95)',
  tooltipTitle: 'rgba(0,0,0,0.5)',
  tooltipBody: 'rgba(0,0,0,0.85)',
  tooltipBorder: 'rgba(0,0,0,0.08)',
  legend: 'rgba(0,0,0,0.45)',
})

const chartData = computed<ChartData<'line'>>(() => ({
  labels: labels.value,
  datasets: props.series.map((s, i) => ({
    label: s.label,
    data: s.points.map(p => p.value),
    borderColor: s.color ?? defaultColors[i % defaultColors.length],
    backgroundColor: s.color
      ? s.color.replace(/[\d.]+\)$/, '0.15)')
      : gradientColors[i % gradientColors.length],
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: s.color ?? defaultColors[i % defaultColors.length],
    pointHoverBorderColor: themeColors.value.hoverBorder,
    pointHoverBorderWidth: 2,
    tension: 0.35,
    fill: true,
  })),
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      grid: { color: themeColors.value.grid },
      ticks: {
        color: themeColors.value.text,
        font: { size: 11 },
        maxTicksLimit: 8,
        maxRotation: 0,
      },
      border: { color: themeColors.value.border },
    },
    y: {
      grid: { color: themeColors.value.grid },
      ticks: {
        color: themeColors.value.text,
        font: { size: 11 },
        callback: (value) => `${props.valuePrefix}${Number(value).toLocaleString()}${props.valueSuffix}`,
      },
      border: { display: false },
    },
  },
  plugins: {
    legend: {
      display: props.showLegend && props.series.length > 1,
      position: 'top',
      align: 'end',
      labels: {
        color: themeColors.value.legend,
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 8,
        font: { size: 11 },
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
      bodyFont: { weight: 'bold' },
      callbacks: {
        label: (ctx) => {
          const val = Number(ctx.parsed.y).toLocaleString('en-US', { maximumFractionDigits: 2 })
          return `${ctx.dataset.label}: ${props.valuePrefix}${val}${props.valueSuffix}`
        },
      },
    },
  },
}))

const changePercent = computed(() => {
  const pts = props.series[0]?.points
  if (!pts || pts.length < 2) return null
  const first = pts[0].value
  const last = pts[pts.length - 1].value
  if (first === 0) return null
  return ((last - first) / first) * 100
})

const lastValue = computed(() => {
  const pts = props.series[0]?.points
  if (!pts || pts.length === 0) return null
  return pts[pts.length - 1].value
})
</script>

<template>
  <div class="bg-base-200 border border-base-content/5 rounded-xl p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-sm font-medium text-base-content/40 uppercase tracking-wider">{{ title }}</h2>
        <div v-if="lastValue !== null" class="flex items-baseline gap-2 mt-1">
          <span class="text-xl font-bold text-base-content">
            {{ valuePrefix }}{{ lastValue.toLocaleString('en-US', { maximumFractionDigits: 2 }) }}{{ valueSuffix }}
          </span>
          <span v-if="changePercent !== null"
            class="text-xs font-semibold px-1.5 py-0.5 rounded"
            :class="changePercent >= 0
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-rose-500/10 text-rose-400'">
            {{ changePercent >= 0 ? '+' : '' }}{{ changePercent.toFixed(2) }}%
          </span>
        </div>
      </div>
      <slot name="actions" />
    </div>
    <div :class="height">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
