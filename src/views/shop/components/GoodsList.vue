<script setup lang="ts" name="GoodsList">
import { fetchGoodsListData } from '@/api/goods'
import OpLoadingView from '@/components/OpLoadingView.vue'
import OpScrollView from '@/components/OpScrollView.vue'
import GoodsItem from './GoodsItem.vue'
import type { IGood, IMenu } from '@/types'
import { useAsync } from '@/use/useAsync'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
const route = useRoute()
const { id } = route.params
const { pending, data } = useAsync(
  () => fetchGoodsListData(id as string).then((v) => v.data),
  [] as IMenu[]
)

const listHeight = [] // 存放右边模块内容的高度
const rightTitHeight = 0 // 右边模块标题的高度
const scrollY = 0 // 右边滚动时的scrollTop

const { setCartItems } = useCartStore()
watch(data, (nv) => {
  const cartGoods = nv
    .reduce((p: IGood[], v: IMenu) => [...p, ...v.goods], [])
    .filter((v) => v.cartCount > 0)

  setCartItems(cartGoods)
})

const categoryActive = ref(0)
const cateActiveRef = ref()
const goodListRefs = ref()
const listScrollTo = ref({
  x: 0,
  y: 0
})
let isCateChange = false

const changeCateChange = (v: number) => {
  isCateChange = true
  const el = goodListRefs.value[v]
  listScrollTo.value = {
    x: 0,
    y: -el.offsetTop
  }

  // proxy.rightList.scrollToElement(proxy.$refs.good[index], 1000, 0, 0);
}
const adjustActiveCateTop = (y: number) => {
  const activeCateRefsHight = 38
  //越界时候，将当前目录栏隐藏
  if (y > 0) {
    cateActiveRef.value.style.top = `-${activeCateRefsHight}px`
    return
  }
  //计算单签位置是否在调整区域  即每个目录标题上方 38px 的区域
  const posY = Math.abs(y)
  for (let i = goodListRefs.value.length; i >= 0; i--) {
    const el = goodListRefs.value[i]
    if ((el.offsetTop = activeCateRefsHight <= posY && posY <= el.offsetTop)) {
      const top = el.offsetTop - posY - activeCateRefsHight
      cateActiveRef.value.style.top = `${top}px`
      return
    }
  }
  //如果都不在。需要固定目录栏
  cateActiveRef.value.style.top = `-1px`
}
const findActiveCate = (y: number) => {
  for (let i = goodListRefs.value.length - 1; i >= 0; i--) {
    const el = goodListRefs.value[i]
    if (el.offsetTop <= Math.abs(y)) {
      return i
    }
  }
  return categoryActive.value
}
const handleGoodListScroll = (pos: { x: number; y: number }) => {
  if (isCateChange) {
    isCateChange = false
    return
  }
  adjustActiveCateTop(pos.y)
  categoryActive.value = findActiveCate(pos.y)
}
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-goods-list">
      <VanSidebar class="sidebar" v-model="categoryActive" @change="changeCateChange">
        <OpScrollView :data="data">
          <VanSidebarItem
            ref="cateRefs"
            v-for="v in data"
            :key="v.label"
            :title="v.label"
          ></VanSidebarItem>
        </OpScrollView>
      </VanSidebar>
      <div class="list" ref="scroll">
        <div ref="cateActiveRef" class="category-name category-name__fixed">
          {{ data[categoryActive].label }}
        </div>
        <OpScrollView
          :data="data"
          :scroll-to="listScrollTo"
          @scroll="handleGoodListScroll"
          @scroll-end="handleGoodListScroll"
        >
          <template v-for="v in data" :key="v.label">
            <div class="category-name" ref="goodListRefs">{{ v.label }}</div>
            <GoodsItem v-for="cv in v.goods" :key="cv.id" :data="cv" />
          </template>
        </OpScrollView>
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
  height: 480px;
  .sidebar {
    overflow: hidden;
    padding-bottom: 50px;
  }
  .list {
    flex: 1;
    margin: 0 10px;
    position: relative;
    .category-name {
      font-size: 15px;
      font-weight: bold;
      padding: 10px 0;
      line-height: 1.2;
      background: white;
      z-index: 1;
      width: 100%;
    }
    &__fixed {
      position: absolute;
      top: -1px;
      left: 0;
    }
    overflow: scroll;
    max-height: 500px;
  }
}
</style>
