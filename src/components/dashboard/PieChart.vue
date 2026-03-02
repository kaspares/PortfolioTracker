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

ChartJS.register(ArcElement, Tooltip, Legend)

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
  Array.from(totalsByCategory.value.values())
    .reduce((a, b) => a + b, 0)
)

const labels = computed(() => Array.from(totalsByCategory.value.keys()))

const dataValues = computed(() => {
  return Array.from(totalsByCategory.value.values())
})

const chartData = computed<ChartData<'pie'>>(() => ({
  labels: labels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
      ],
      borderWidth: 0,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'pie'>>(() => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const value = ctx.parsed
          const percent = ((value / total.value) * 100).toFixed(2)
          return `${ctx.label}: ${percent}%`
        },
      },
    },
  },
}))
</script>

<template>
  <div class="card bg-base-100 shadow  pb-21">
    <h2 class="text-lg font-semibold pl-6 pt-4 mb-4">Portfolio Allocation</h2>

    <div class="max-w-md mx-auto">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>