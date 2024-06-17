<script setup lang="ts" name="Home">
import { ref } from 'vue'
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
const active = ref('home')
const recomments = [
  {
    value: 11,
    label: '餐饮'
  }
]

const [isSearchViewShow, toggleSearchView] = useToggle(false)
</script>

<template>
  <div class="test">
    <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView"></TheTop>
  </div>
</template>
<style scoped>
.test {
  font-size: 39px;
}
</style>
