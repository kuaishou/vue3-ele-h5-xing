<script setup lang="ts" name="SearchView">
import { fetchSearchData } from '@/api/search'
import OpSearch from '@/components/OpSearch.vue'
import type { ISearchResult } from '@/types'
import { useDebounce } from '@/use/useDebounce'
import { useToggle } from '@/use/useToggle'
import { computed, ref, watch } from 'vue'
interface Irmits {
  (e: 'cancel'): void
}
const emits = defineEmits<Irmits>()
const saerchValue = ref('')
const [isHistoryTagShow, toggleHistoryTag] = useToggle(false)
const HISTORY_TAGS = [
  '比萨',
  '苹果',
  '玉米',
  '牛腩',
  '水果',
  '香蕉',
  '小野鸡',
  '土豆鸡饭',
  '烧烤',
  '火锅'
]
const historyTags = computed(() =>
  isHistoryTagShow.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5)
)

console.log('ddddd', historyTags.value[0])

const [INIT, DONE, DOING] = [-1, 0, 1]
const saerchState = ref(INIT) //
const saerchResult = ref([] as ISearchResult[])
const onSearch = async (v?: string | number) => {
  try {
    saerchState.value = DOING
    const { list } = await fetchSearchData(v)

    saerchResult.value = list
  } finally {
    console.log('几个', v)
    saerchState.value = DONE
  }
}
const onTagClick = async (v: string) => {
  saerchValue.value = v
  onSearch(v)
}

const debounceVale = useDebounce(saerchValue, 1000)
watch(debounceVale, (nv) => {
  if (!nv) {
    saerchResult.value = []
    return
  }
  onSearch(nv)
})
</script>
<template>
  <div class="search-view">
    <op-search
      show-action
      v-model="saerchValue"
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="请输入关键词搜索 "
      @search="onSearch"
      @cancel="emits('cancel')"
    >
      <!-- <template #right-icon>
        <div @click="emits('searchClick')">搜索</div>
      </template> -->
    </op-search>
    <div v-if="!saerchValue" class="search-view__history">
      <div class="label">历史搜索</div>
      <TransitionGroup name="list">
        <div class="history-tag" @click="onTagClick(v)" v-for="v in historyTags" :key="v">
          {{ v }}
        </div>
        <div key="upDown" class="history-tag" @click="toggleHistoryTag">
          <van-icon v-if="isHistoryTagShow" name="arrow-up"></van-icon>
          <van-icon v-else name="arrow-down"></van-icon>
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="search-view__result">
      <div class="searching" v-if="saerchState === DOING">正在搜索</div>
      <template v-if="saerchState === DONE">
        <div class="result-item" v-for="v in saerchResult" :key="v.label">
          <van-icon name="search"></van-icon>
          <div class="name">{{ v.label }}</div>
          <div class="count">约{{ v.resultCount }}个结果</div>
        </div>
        <div class="no-result" v-if="!saerchResult.length">~暂无推荐</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 999;
  &__history {
    padding: var(--van-padding-sm);
    .label {
      margin-bottom: var(--van-padding-xs);
    }
    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background-color: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }
  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);
    }
    .name {
      flex: 1;
      padding-left: 6px;
    }
    .count {
      font-size: 12px;
      color: var(--van-gray-6);
    }
    .no-result,
    .searching {
      font-size: 12px;
      padding: 100px 0;
      text-align: center;
      color: var(--van-gray-6);
    }
  }
}
.list-erter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-erter-from,
.list-leave-to {
  opacity: 0;
  transform: translate(30px);
}
</style>
