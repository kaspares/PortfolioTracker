<script setup lang="ts">
import type { PortfolioSummary } from '@/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
  portfolio: PortfolioSummary
}>()
const router = useRouter()

const selectPortfolio = (id: string) => {
  router.push(`/portfolio/${id}/dashboard`)
}
</script>

<template>
  <div
    @click="selectPortfolio(portfolio.id)"
    class="group bg-base-200 border border-base-content/5 rounded-xl p-6 cursor-pointer
           hover:border-primary/30 hover:bg-base-200/80 transition-all duration-200"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5 text-primary">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-base-content/20 group-hover:text-primary/60 transition-colors">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </div>

    <h3 class="text-lg font-semibold text-base-content group-hover:text-primary transition-colors">
      {{ portfolio.name }}
    </h3>
    <p class="text-sm text-base-content/50 mt-1 line-clamp-2">
      {{ portfolio.description }}
    </p>

    <div class="flex items-center gap-4 mt-5 pt-4 border-t border-base-content/5">
      <div class="flex items-center gap-1.5 text-sm text-base-content/40">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5">
          <rect width="20" height="14" x="2" y="6" rx="2"/><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
        {{ portfolio.itemCount }} instruments
      </div>
    </div>
  </div>
</template>
