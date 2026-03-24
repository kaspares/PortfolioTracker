<script setup lang="ts">
import type { PortfolioItem } from '@/types/index'
import { useRoute } from 'vue-router'

const props = defineProps<{
  items: PortfolioItem[]
}>()

const route = useRoute()
const portfolioId = route.params.portfolioId as string

const money = (n: number, digits = 2) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`
</script>

<template>
  <div class="bg-base-200 border border-base-content/5 rounded-xl overflow-hidden">
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr class="border-b border-base-content/5">
            <th class="text-xs font-medium text-base-content/40 uppercase tracking-wider bg-transparent">Instrument</th>
            <th class="text-xs font-medium text-base-content/40 uppercase tracking-wider bg-transparent text-right">Qty</th>
            <th class="text-xs font-medium text-base-content/40 uppercase tracking-wider bg-transparent text-right">Avg. Buy</th>
            <th class="text-xs font-medium text-base-content/40 uppercase tracking-wider bg-transparent text-right">Current</th>
            <th class="text-xs font-medium text-base-content/40 uppercase tracking-wider bg-transparent text-right">Value</th>
            <th class="text-xs font-medium text-base-content/40 uppercase tracking-wider bg-transparent text-right">P&amp;L</th>
            <th class="text-xs font-medium text-base-content/40 uppercase tracking-wider bg-transparent text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id"
            class="border-b border-base-content/5 last:border-0 hover:bg-base-300/30 transition-colors">
            <td>
              <router-link :to="`/portfolio/${portfolioId}/stock/${item.ticker}`"
                class="flex items-center gap-3 group/ticker">
                <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary group-hover/ticker:bg-primary/20 transition-colors">
                  {{ item.ticker.slice(0, 2) }}
                </div>
                <span class="font-semibold text-sm group-hover/ticker:text-primary transition-colors">{{ item.ticker }}</span>
              </router-link>
            </td>
            <td class="text-right text-sm">{{ item.quantity }}</td>
            <td class="text-right text-sm text-base-content/70">{{ money(item.purchasePrice) }}</td>
            <td class="text-right text-sm">{{ money(item.currentPrice ?? 0) }}</td>
            <td class="text-right text-sm font-medium">{{ money(item.marketValue ?? 0) }}</td>
            <td class="text-right">
              <div class="text-sm font-semibold" :class="(item.profitLoss ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'">
                {{ (item.profitLoss ?? 0) >= 0 ? '+' : '' }}{{ money(item.profitLoss ?? 0) }}
              </div>
              <div class="text-xs" :class="(item.profitLossPercent ?? 0) >= 0 ? 'text-emerald-400/60' : 'text-rose-400/60'">
                {{ (item.profitLossPercent ?? 0) >= 0 ? '+' : '' }}{{ (item.profitLossPercent ?? 0).toFixed(2) }}%
              </div>
            </td>
            <td class="text-right">
              <div class="flex items-center justify-end gap-1">
                <button class="btn btn-ghost btn-xs btn-square text-base-content/40 hover:text-base-content" title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  </svg>
                </button>
                <button class="btn btn-ghost btn-xs btn-square text-base-content/40 hover:text-rose-400" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty state -->
    <div v-if="!items || items.length === 0" class="py-16 text-center">
      <div class="w-12 h-12 rounded-xl bg-base-300 flex items-center justify-center mx-auto mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6 text-base-content/30">
          <rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>
        </svg>
      </div>
      <p class="text-sm text-base-content/40">No positions yet</p>
    </div>
  </div>
</template>
