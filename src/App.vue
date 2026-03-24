<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div :data-theme="themeStore.theme" class="min-h-screen bg-base-300">
      <router-view/>
  </div>
</template>