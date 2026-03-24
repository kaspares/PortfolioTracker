<script setup lang="ts">
import { computed, ref } from 'vue'

interface DayData {
  date: Date
  value: number | null
}

const props = defineProps<{
  data: Record<string, number>
}>()

const hoveredDay = ref<DayData | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', '']

const weeks = computed(() => {
  const today = new Date()
  const result: DayData[][] = []
  const end = new Date(today)

  const start = new Date(today)
  start.setDate(start.getDate() - 363)
  const startDay = start.getDay()
  const mondayOffset = startDay === 0 ? -6 : 1 - startDay
  start.setDate(start.getDate() + mondayOffset)

  let currentWeek: DayData[] = []
  const cursor = new Date(start)

  while (cursor <= end) {
    const iso = cursor.toISOString().slice(0, 10)
    currentWeek.push({
      date: new Date(cursor),
      value: props.data[iso] ?? null,
    })

    if (currentWeek.length === 7) {
      result.push(currentWeek)
      currentWeek = []
    }

    cursor.setDate(cursor.getDate() + 1)
  }

  if (currentWeek.length > 0) {
    result.push(currentWeek)
  }

  return result
})

const monthMarkers = computed(() => {
  const markers: { label: string; col: number }[] = []
  let lastMonth = -1

  for (let w = 0; w < weeks.value.length; w++) {
    const firstDay = weeks.value[w][0]
    const month = firstDay.date.getMonth()
    if (month !== lastMonth) {
      markers.push({ label: monthLabels[month], col: w })
      lastMonth = month
    }
  }

  return markers
})

const maxAbsValue = computed(() => {
  const values = Object.values(props.data)
  if (values.length === 0) return 1
  return Math.max(...values.map(Math.abs), 1)
})

function getCellClass(day: DayData): string {
  if (day.date > new Date()) return 'bg-transparent'
  if (day.value === null || day.value === 0) return 'bg-base-300/50'

  const intensity = Math.min(Math.abs(day.value) / maxAbsValue.value, 1)

  if (day.value > 0) {
    if (intensity < 0.25) return 'bg-success/20'
    if (intensity < 0.5) return 'bg-success/40'
    if (intensity < 0.75) return 'bg-success/65'
    return 'bg-success/90'
  } else {
    if (intensity < 0.25) return 'bg-error/20'
    if (intensity < 0.5) return 'bg-error/40'
    if (intensity < 0.75) return 'bg-error/65'
    return 'bg-error/90'
  }
}

function onCellHover(day: DayData, event: MouseEvent) {
  hoveredDay.value = day
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const parent = (event.target as HTMLElement).closest('.heatmap-container')!.getBoundingClientRect()
  tooltipPos.value = {
    x: rect.left - parent.left + rect.width / 2,
    y: rect.top - parent.top - 8,
  }
}

function onCellLeave() {
  hoveredDay.value = null
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

function formatPnl(value: number | null): string {
  if (value === null) return 'No data'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)} PLN`
}
</script>

<template>
  <div class="bg-base-200 border border-base-content/5 rounded-xl p-6 w-fit">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-sm font-medium text-base-content/40 uppercase tracking-wider">Daily P&L</h2>
      <div class="flex items-center gap-1.5 text-[10px] text-base-content/30">
        <span>Loss</span>
        <span class="inline-block w-2.5 h-2.5 rounded-sm bg-error/90"></span>
        <span class="inline-block w-2.5 h-2.5 rounded-sm bg-error/40"></span>
        <span class="inline-block w-2.5 h-2.5 rounded-sm bg-base-300/50"></span>
        <span class="inline-block w-2.5 h-2.5 rounded-sm bg-success/40"></span>
        <span class="inline-block w-2.5 h-2.5 rounded-sm bg-success/90"></span>
        <span>Profit</span>
      </div>
    </div>

    <div class="heatmap-container relative overflow-x-auto">
      <div class="flex ml-8 mb-1">
        <div class="relative w-full" style="height: 16px;">
          <span
            v-for="marker in monthMarkers"
            :key="marker.col"
            class="absolute text-[10px] text-base-content/30"
            :style="{ left: `${marker.col * 14}px` }"
          >
            {{ marker.label }}
          </span>
        </div>
      </div>

      <div class="flex gap-0">
        <div class="flex flex-col gap-[3px] mr-1.5 shrink-0" style="width: 26px;">
          <div
            v-for="(label, i) in dayLabels"
            :key="i"
            class="h-[11px] text-[10px] leading-[11px] text-base-content/30 text-right pr-0.5"
          >
            {{ label }}
          </div>
        </div>

        <div class="flex gap-[3px]">
          <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col gap-[3px]">
            <div
              v-for="(day, di) in week"
              :key="di"
              class="w-[11px] h-[11px] rounded-sm cursor-pointer transition-all duration-100"
              :class="[getCellClass(day), hoveredDay === day ? 'ring-1 ring-base-content/40 scale-125' : '']"
              @mouseenter="onCellHover(day, $event)"
              @mouseleave="onCellLeave"
            ></div>
          </div>
        </div>
      </div>

      <Transition
        enter-active-class="transition-opacity duration-100"
        leave-active-class="transition-opacity duration-75"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="hoveredDay"
          class="absolute pointer-events-none z-10 px-2.5 py-1.5 rounded-lg bg-base-300 border border-base-content/10 shadow-lg text-xs -translate-x-1/2 -translate-y-full whitespace-nowrap"
          :style="{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }"
        >
          <div class="font-medium text-base-content/80">{{ formatDate(hoveredDay.date) }}</div>
          <div
            class="font-semibold mt-0.5"
            :class="hoveredDay.value === null ? 'text-base-content/40'
              : hoveredDay.value >= 0 ? 'text-success' : 'text-error'"
          >
            {{ formatPnl(hoveredDay.value) }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
