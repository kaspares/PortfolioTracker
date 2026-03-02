<script setup lang="ts">
import { PortfolioInstrument } from '@/types/index'

const props = defineProps<{
   items: PortfolioInstrument [] 
}>()

const money = (n: number, digits = 2) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`

const valueOf = (i: PortfolioInstrument) => i.quantity * i.currentPrice
const pnlValueOf = (i: PortfolioInstrument) => (i.currentPrice - i.avgBuy) * i.quantity
const pnlPercentOf = (i: PortfolioInstrument) =>
  i.avgBuy === 0 ? 0 : ((i.currentPrice - i.avgBuy) / i.avgBuy) * 100

</script>

<template>
 <div>
    <div class="flex flex-col pb-6">
        <span class="text-4xl">Portfolio</span>
        <span class="">Manage your investings</span>
    </div>
     <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
       <table class="table">
         <thead>
           <tr>
             <th>Instrument</th>
             <th>Type</th>
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
             <!-- Instrument -->
             <td>
               <div class="font-semibold">{{ item.ticker }}</div>
               <div class="text-sm text-base-content/60">{{ item.name }}</div>
             </td>
   
             <!-- Type -->
             <td>
               <span
                 class="badge badge-outline"
                 :class="
                   item.type === 'Stock'
                     ? 'badge-info'
                     : item.type === 'Crypto'
                       ? 'badge-warning'
                       : 'badge-success'
                 "
               >
                 {{ item.type }}
               </span>
             </td>
   
             <!-- Quantity -->
             <td class="text-right">{{ item.quantity }}</td>
   
             <!-- Avg Buy -->
             <td class="text-right">{{ money(item.avgBuy, 2) }}</td>
   
             <!-- Current -->
             <td class="text-right">{{ money(item.currentPrice, 3) }}</td>
   
             <!-- Value -->
             <td class="text-right">{{ money(valueOf(item), 3) }}</td>
   
             <!-- P&L -->
             <td class="text-right">
               <div :class="pnlValueOf(item) >= 0 ? 'text-emerald-600' : 'text-rose-600'">
                 {{ pnlValueOf(item) >= 0 ? '+' : '' }}{{ money(pnlValueOf(item), 3) }}
               </div>
               <div
                 class="text-sm"
                 :class="pnlPercentOf(item) >= 0 ? 'text-emerald-600' : 'text-rose-600'"
               >
                 {{ pnlPercentOf(item) >= 0 ? '+' : '' }}{{ pnlPercentOf(item).toFixed(2) }}%
               </div>
             </td>
   
             <!-- Actions -->
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