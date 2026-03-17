<script setup lang="ts">
import type { PortfolioSummary } from '@/types';
import { useRouter } from 'vue-router';

const props = defineProps<{
    portfolio: PortfolioSummary
}>() 
const router = useRouter()

const selectPortfolio = (id: string) => {
    router.push(`/portfolio/${id}/dashboard`)
}
</script>

<template>
    <div>
        <div class="card bg-primary text-primary-content w-96">
            <div class="card-body">
                <h2 class="card-title">{{ props.portfolio?.name }}</h2>
                <p>{{ props.portfolio?.description }}</p>
                <p>{{ props.portfolio?.itemCount }}</p>
                <div class="card-actions justify-end">
                <button class="btn" @click="selectPortfolio(props.portfolio.id)">Choose</button>
            </div>
        </div>
    </div>
</div>
</template>