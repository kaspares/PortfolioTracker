<script setup lang="ts">
import AppSideBar from './components/layout/AppSideBar.vue';
</script>

<template>
  <div data-theme="valentine">
    <AppSideBar>
      <router-view/>
    </AppSideBar>
  </div>
</template>