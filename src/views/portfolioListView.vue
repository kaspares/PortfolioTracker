<script setup lang="ts">
import PortfolioSummaryCard from '@/components/portfolio/portfolioSummaryCard.vue';
import TheHeader from '@/components/ui/TheHeader.vue';
import { usePortfolioStore } from '@/stores/portfolio'
import { onMounted } from 'vue';

const portfolioStore = usePortfolioStore()

onMounted(() => {
    portfolioStore.fetchPortfoliosSummaries()
})

</script>

<template>
    <TheHeader/>
    <div class="flex flex-row justify-center m-10 gap-8">
        <PortfolioSummaryCard
        v-for="p in portfolioStore.portfolios" 
        :key="p.id"
        :portfolio="p"
        />
    </div>
</template>