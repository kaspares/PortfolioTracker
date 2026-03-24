<script setup lang="ts">
import StatCard from '@/components/ui/StatCard.vue'
import PieChart from '@/components/dashboard/PieChart.vue'
import LineChart from '@/components/ui/LineChart.vue'
import SignalsList from '@/components/dashboard/SignalsList.vue'
import PnlHeatmap from '@/components/dashboard/PnlHeatmap.vue'
import type { Signals, PerfomanceItem, ChartSeries } from '../types'
import PerformanceListCard from '@/components/dashboard/PerformanceListCard.vue'
import { usePortfolioStore } from '@/stores/portfolio'

// TODO: zamienić na dane z backendu
const signals: Signals[] = [
  { id: '1', stock: { ticker: 'AAPL' }, result: 'BUY', describe: 'RSI oversold, strong support at 210' },
  { id: '2', stock: { ticker: 'BTC' }, result: 'SELL', describe: 'Death cross on 4H, momentum fading' },
  { id: '3', stock: { ticker: 'NVDA' }, result: 'BUY', describe: 'Breakout above resistance with high volume' },
]

const gainers: PerfomanceItem[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corporation', price: 914.72, changePercent: 5.84 },
  { ticker: 'BTC', name: 'Bitcoin', price: 71163.12, changePercent: 3.91 },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: 218.44, changePercent: 2.67 },
  { ticker: 'META', name: 'Meta Platforms', price: 503.01, changePercent: 1.43 },
]

const losers: PerfomanceItem[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: 174.17, changePercent: -1.24 },
  { ticker: 'NFLX', name: 'Netflix Inc.', price: 598.33, changePercent: -2.15 },
]

// TODO: fetch z API, na razie hardcoded
const portfolioValueHistory: ChartSeries[] = [
  {
    label: 'Portfolio Value',
    points: [
      { date: 'Jan 1', value: 10000 },
      { date: 'Jan 22', value: 10480 },
      { date: 'Feb 5', value: 9730 },
      { date: 'Feb 19', value: 10150 },
      { date: 'Mar 3', value: 11200 },
      { date: 'Mar 12', value: 10870 },
      { date: 'Mar 19', value: 11690 },
    ],
  },
]

const portfolioStore = usePortfolioStore()

function generateMockPnl(): Record<string, number> {
  const data: Record<string, number> = {}
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    if (Math.random() < 0.12) continue
    data[d.toISOString().slice(0, 10)] = Math.round(((Math.random() - 0.45) * 500) * 100) / 100
  }
  return data
}
const dailyPnl = generateMockPnl()
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-base-content">Dashboard</h1>
      <p class="text-sm text-base-content/40 mt-1">Overview of your portfolio performance</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <StatCard title="Total Value" :value="portfolioStore.currentPortfolio?.totalValue" symbol="PLN" />
      <StatCard title="Total P&L" :value="portfolioStore.currentPortfolio?.totalProfitLoss" symbol="PLN"
      :trend="(portfolioStore.currentPortfolio?.totalProfitLoss ?? 0) >= 0 ? 'up' : 'down'" />
      <StatCard title="Instruments" :value="portfolioStore.currentPortfolio?.items.length" />
      <StatCard title="Active Signals" :value="0" />
    </div>

    <div class="mb-6 flex flex-center justify-center">
      <PnlHeatmap :data="dailyPnl" />
    </div>

    <div class="mb-6">
      <LineChart
        title="Portfolio Value"
        :series="portfolioValueHistory"
        value-suffix=" PLN"
      >
        <template #actions>
          <div class="flex gap-1">
            <button class="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium">3M</button>
            <button class="px-2.5 py-1 text-xs rounded-md text-base-content/40 hover:text-base-content/60 hover:bg-base-300/50 transition-colors">6M</button>
            <button class="px-2.5 py-1 text-xs rounded-md text-base-content/40 hover:text-base-content/60 hover:bg-base-300/50 transition-colors">1Y</button>
            <button class="px-2.5 py-1 text-xs rounded-md text-base-content/40 hover:text-base-content/60 hover:bg-base-300/50 transition-colors">ALL</button>
          </div>
        </template>
      </LineChart>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
      <PieChart :positions="portfolioStore.currentPortfolio?.items?.map(i => ({
        category: i.ticker,
        value: i.marketValue ?? 0
      })) ?? []" />
      <SignalsList :signals="signals" />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <PerformanceListCard type="Gainers" :items="gainers" />
      <PerformanceListCard type="Losers" :items="losers" />
    </div>
  </div>
</template>
