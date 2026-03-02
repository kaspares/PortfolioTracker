<script setup lang="ts">
import type { MoverType, PerfomanceItem } from '@/types';
import PerformanceListItem from './PerformanceListItem.vue';
const props = defineProps<{
    type: MoverType
    items: PerfomanceItem[]
}>()

const isGainers = props.type === 'Gainers'
</script>

<template>
    <div>
        <div class="card card-md shadow p-4 mt-8 bg-base-100">
            <div class="card-title">
                <span v-if="isGainers" class="text-emerald-600">↗</span>
                <span v-else>↘</span>
                <span>Top {{ type }}</span>
            </div>
            <div class="card-body">
                <PerformanceListItem 
                 v-for="item in items"
                 :key="item.ticker"
                 :item="item"
                 :variant="isGainers ? 'up' : 'down' "
                 />
            </div>
        </div>
    </div>
</template>