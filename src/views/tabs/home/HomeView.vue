<script setup lang="ts" name="Home">
import { ref } from 'vue'
import TheTop from './components/TheTop.vue'
import SearchView from '@/views/search/SearchView.vue'
import OpLoadingView from '@/components/OpLoadingView.vue'
import { useToggle } from '@/use/useToggle'
import { fetchHomePageData } from '@/api/home'
import { useAsync } from '@/use/useAsync'
import type { IHomeInfo } from '@/types'
const recomments = [
  {
    value: 11,
    label: '餐饮'
  }
]

const [isSearchViewShow, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<template>
  <div class="test">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView"></TheTop>
    <OpLoadingView :loading="pending" type="skeleton">
      <!-- <template #template>
        <div>loading....</div>
      </template> -->
      <div>{{ data }}</div>
    </OpLoadingView>
    <!-- {{ pending }} -->
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
