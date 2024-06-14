<script setup lang="ts" name="Home">
import { ref } from 'vue'
import TheTop from './components/TheTop.vue'
import { RouterView } from 'vue-router'
const active = ref('home')
const recomments = [
  {
    value: 11,
    label: '餐饮'
  }
]
</script>

<template>
  <div class="test">
    <TheTop :recomments="recomments"></TheTop>
  </div>
</template>
<style scoped>
.test {
  font-size: 39px;
}
</style>
