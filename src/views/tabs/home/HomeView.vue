<script setup lang="ts" name="Home">
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { RouterView } from 'vue-router'
const active = ref('home')
</script>

<template>
  <div class="test">home</div>
</template>
<style scoped>
.test {
  font-size: 39px;
}
</style>
