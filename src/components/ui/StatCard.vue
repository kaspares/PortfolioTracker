<script setup lang="ts">
const props = defineProps<{
    title: string,
    value: number,
    describe?: string
}>()
</script>

<template>
  <div class="stat shadow rounded-box bg-base-100">
    <div class="stat-title">{{ props.title }}</div>
    <div class="stat-value">{{ props.value}}</div>
    <div class="stat-desc">{{ props.describe }}</div>
  </div>
</template>