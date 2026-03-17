<script setup lang="ts">
import type { PortfolioItem } from '@/types/index'

const props = defineProps<{
   items: PortfolioItem [] 
}>()

const money = (n: number, digits = 2) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`

</script>

<template>
 <div>
     <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
       <table class="table">
         <thead>
           <tr>
             <th>Instrument</th>
             <th class="text-right">Quantity</th>
             <th class="text-right">Avg. Buy</th>
             <th class="text-right">Current</th>
             <th class="text-right">Value</th>
             <th class="text-right">P&amp;L</th>
             <th class="text-right">Actions</th>
           </tr>
         </thead>
   
         <tbody>
           <tr v-for="item in items" :key="item.id">
    <td>
      <div class="font-semibold">{{ item.ticker }}</div>
    </td>

    <!-- Type - usuń lub zostaw hardcoded, nie masz typu w danych -->

    <td class="text-right">{{ item.quantity }}</td>

    <td class="text-right">{{ money(item.purchasePrice) }}</td>

    <td class="text-right">{{ money(item.currentPrice ?? 0) }}</td>

    <td class="text-right">{{ money(item.marketValue ?? 0) }}</td>

    <td class="text-right">
      <div :class="(item.profitLoss ?? 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'">
        {{ (item.profitLoss ?? 0) >= 0 ? '+' : '' }}{{ money(item.profitLoss ?? 0) }}
      </div>
      <div class="text-sm" :class="(item.profitLossPercent ?? 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'">
        {{ (item.profitLossPercent ?? 0) >= 0 ? '+' : '' }}{{ (item.profitLossPercent ?? 0).toFixed(2) }}%
      </div>
    </td>

    <td class="text-right">
      <button class="btn btn-ghost btn-xs" title="Edit">✏️</button>
      <button class="btn btn-ghost btn-xs text-rose-500" title="Delete">🗑️</button>
    </td>
  </tr>
         </tbody>
       </table>
     </div>
 </div>   
</template>