<script setup lang="ts">
const props = defineProps<{
    title: string,
    value: number | undefined,
    symbol?: string | undefined
    describe?: string
}>()
</script>

<template>
  <div class="stat shadow rounded-box bg-base-100">
    <div class="stat-title">{{ props.title }}</div>
    <div class="stat-value">{{ props.value}} {{ props.symbol }}</div>
    <div class="stat-desc">{{ props.describe }}</div>
  </div>
</template>