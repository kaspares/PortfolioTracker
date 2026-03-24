<script setup lang="ts">
import { ref } from 'vue'
import NewPositionForm from '@/components/portfolio/NewPositionForm.vue'
import PortfolioTable from '@/components/portfolio/PortfolioTable.vue'
import { usePortfolioStore } from '@/stores/portfolio'

const showModal = ref(false)
const portfolioStore = usePortfolioStore()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-base-content">Positions</h1>
        <p class="text-sm text-base-content/40 mt-1">Manage your investment positions</p>
      </div>
      <button class="btn btn-primary gap-2" @click="showModal = true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add Position
      </button>
    </div>

    <PortfolioTable :items="portfolioStore.currentPortfolio?.items" />

    <NewPositionForm v-model:open="showModal" />
  </div>
</template>
