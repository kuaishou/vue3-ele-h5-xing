<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { featchTest } from '@/api/test'

featchTest()
</script>

<template>
  <RouterView />
</template>

<style scoped>
@import 'normalize.css';
#app {
  /* 字体抗锯齿，让字体看起来更清晰 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
