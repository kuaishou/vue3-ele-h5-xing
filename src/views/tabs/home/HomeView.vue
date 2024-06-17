<script setup lang="ts" name="Home">
import { ref } from 'vue'
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import { useToggle } from '@/use/useToggle'
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
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView"></TheTop>
  </div>
</template>
<style scoped lang="scss">
.fade-erter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-erter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
