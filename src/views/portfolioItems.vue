<script setup lang="ts">
import { ref } from 'vue'
import NewPositionForm from '@/components/portfolio/NewPositionForm.vue';
import PortfolioTable from '@/components/portfolio/PortfolioTable.vue';
import { usePortfolioStore } from '@/stores/portfolio';

const showModal = ref(false)

const portfolioStore = usePortfolioStore();
</script>

<template>
<div>
  <div class="flex justify-between items-center pb-6">
    <div class="flex flex-col">
      <span class="text-4xl">Portfolio</span>
      <span class="">Manage your investings</span>
    </div>
    <button class="btn btn-primary mr-5 mt-10" @click="showModal = true">
    Add position
    </button>
</div>
    <PortfolioTable
    :items="portfolioStore.currentPortfolio?.items"
    />
    <NewPositionForm
    v-model:open="showModal"/>
</div>
</template>