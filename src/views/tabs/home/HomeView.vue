<script setup lang="ts" name="Home">
import { ref } from 'vue'
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'
import CountDown from './components/CountDown.vue'
import OpSwipe from '@/components/swipe/OpSwipe'
import OpSwipeItem from '@/components/swipe/OpSwipeItem'
import SearchView from '@/views/search/SearchView.vue'
import OpLoadingView from '@/components/OpLoadingView.vue'
import { useToggle } from '@/use/useToggle'
import { fetchHomePageData } from '@/api/home'
import { useAsync } from '@/use/useAsync'
import type { IHomeInfo, Icountdown } from '@/types'
const recomments = [
  {
    value: 11,
    label: '餐饮'
  }
]

const [isSearchViewShow, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as Icountdown,
  activities: []
} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView"></TheTop>
    <OpLoadingView :loading="pending" type="skeleton">
      <div class="home-page__banner">
        <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
      </div>
      <TheTransformer :data="data.transformer" />
      <ScrollBar :data="data.scrollBarInfoList" />
      <div class="home-page__activity">
        <CountDown :data="data.countdown"></CountDown>
        <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
          <OpSwipeItem v-for="v in data.activities" :key="v">
            <img :src="v" />
          </OpSwipeItem>
        </OpSwipe>
      </div>

      <!-- <template #template>
        <div>loading....</div>
      </template> -->
      <!-- <div>{{ data }}</div> -->
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

.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
