<script setup lang="ts">
import StatCard from '@/components/ui/StatCard.vue';
import PieChart from '@/components/dashboard/PieChart.vue';
import SignalsList from '@/components/dashboard/SignalsList.vue';
import type { Signals, PerfomanceItem } from '../types';
import PerformanceListCard from '@/components/dashboard/PerformanceListCard.vue';
import { usePortfolioStore } from '@/stores/portfolio';

const signals: Signals[] = [
  { id: '1', stock: { ticker: 'AAPL' }, result: 'BUY', describe: 'RSI oversold, strong support at 210' },
  { id: '2', stock: { ticker: 'BTC' },  result: 'SELL', describe: 'Death cross on 4H, momentum fading' },
  { id: '3', stock: { ticker: 'NVDA' }, result: 'BUY', describe: 'Breakout above resistance with high volume' },
  { id: '3', stock: { ticker: 'NVDA' }, result: 'BUY', describe: 'Breakout above resistance with high volume' },
]

const gainers: PerfomanceItem[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 914.72,
    changePercent: 5.84,
  },
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    price: 71163.12,
    changePercent: 3.91,
  },
  {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 218.44,
    changePercent: 2.67,
  },
]

const losers: PerfomanceItem[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 174.17,
    changePercent: -1.24,
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 162.55,
    changePercent: -0.88,
  },
  {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    price: 598.33,
    changePercent: -2.15,
  },
]

const portfolioStore = usePortfolioStore()
</script>

<template>
<div>
  <div class="flex flex-col">
      <div class="flex flex-row gap-4 mb-10">
          <StatCard title="Total value" :value="portfolioStore.currentPortfolio?.totalValue" symbol="zł"/>
          <StatCard title="Total P&L" :value="portfolioStore.currentPortfolio?.totalProfitLoss" />
          <StatCard title="Instruments" :value="portfolioStore.currentPortfolio?.items.length"/>
          <StatCard title="Active Signals" :value="0"/>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <PieChart :positions="portfolioStore.currentPortfolio?.items?.map(i => ({
                category: i.ticker,
                value: i.marketValue ?? 0
              })) ?? []"/>
              <SignalsList :signals="signals"/>
      </div>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <PerformanceListCard type="Gainers" :items="gainers" />
        <PerformanceListCard type="Losers" :items="losers"/>
      </div>
  </div>
</div>  
</template>