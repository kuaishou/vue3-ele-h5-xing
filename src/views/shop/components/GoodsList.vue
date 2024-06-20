<script setup lang="ts" name="GoodsList">
import { fetchGoodsListData } from '@/api/goods'
import OpLoadingView from '@/components/OpLoadingView.vue'
import GoodsItem from './GoodsItem.vue'
import type { IMenu } from '@/types'
import { useAsync } from '@/use/useAsync'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { id } = route.params
const { pending, data } = useAsync(
  () => fetchGoodsListData(id as string).then((v) => v.data),
  [] as IMenu[]
)
const categoryActive = ref(0)
const listHeight = [] // 存放右边模块内容的高度
const rightTitHeight = 0 // 右边模块标题的高度
const scrollY = 0 // 右边滚动时的scrollTop

const changeMenu = (index: number) => {
  // proxy.rightList.scrollToElement(proxy.$refs.good[index], 1000, 0, 0);
}
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-goods-list">
      <VanSidebar v-model="categoryActive" @change="changeMenu">
        <VanSidebarItem v-for="v in data" :key="v.label" :title="v.label"></VanSidebarItem>
      </VanSidebar>
      <div class="list" ref="scroll">
        <template v-for="v in data" :key="v.label">
          <!-- <div class="category-name" ref="rightTit">{{ v.label }}</div> -->
          <GoodsItem v-for="cv in v.goods" :key="cv.id" :data="cv" />
        </template>
      </div>
    </div>
  </OpLoadingView>
</template>

<style lang="scss" scoped>
.shop-goods-list {
  --van-sidebar-selectes-boder-color: none;
  --van-sidebar-padding: 14px var(--van-padding-sm);
  --van-sidebar-font-size: 13px;
  display: flex;

  .list {
    flex: 1;
    margin: 0 10px;
    .category-name {
      font-size: 15px;
      font-weight: bold;
      padding: 10px 0;
      line-height: 1.2;
    }
    overflow: scroll;
    max-height: 500px;
  }
}
</style>
