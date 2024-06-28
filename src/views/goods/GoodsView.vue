<script setup lang="ts" name="GoodsView">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchGoodsDetailData } from '@/api/goods'
import type { IGood } from '@/types'
import { useAsync } from '@/use/useAsync'
import CartControl from '../shop/components/CartControl.vue'
import ShopCart from '../shop/components/ShopCart.vue'

const { params } = useRoute()
const { data } = useAsync(() => fetchGoodsDetailData(params.id as string), {} as IGood)

const imgContRef = ref()
const imgRef = ref()
onMounted(() => {
  const easeOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d
    t--
    return c * (t * t * t + 1) + b
  }
  const imgContEle = imgContRef.value
  const imgEle = imgRef.value
  const imgHeight = imgContEle.clientHeight
  let startY = 0
  window.addEventListener('touchstart', (e) => {
    const y = e.targetTouches[0].clientX
    if (y > imgHeight) {
      return
    }
    startY = y
    imgContEle.classList.remove('rebound')
    imgEle.classList.remove('rebound')
  })
  window.addEventListener(
    'touchmove',
    (e) => {
      console.log(startY)
      if (!startY) {
        return
      }
      e.preventDefault()
      const y = e.targetTouches[0].clientY
      const moveDis = y - startY
      if (window.scrollY <= 0 && moveDis > 0) {
        const height = easeOutCubic(moveDis, imgHeight, 130, 130)
        imgContEle.style.height = `${height}px`
        const scale = easeOutCubic(moveDis, 1, 0.2, 300)
        imgEle.style.transform = `translate(-50%,-50%) scale(${scale})`
      }
    },
    {
      passive: false
    }
  )
  window.addEventListener('touchend', (e) => {
    startY = 0
    imgContEle.style.height = `${imgHeight}px`
    imgEle.style.transform = `translate(-50%,-50%)`
    imgContEle.classList.add('rebound')
    imgEle.classList.add('rebound')
  })
})
</script>

<template>
  <div class="goods-page op-fullscreen">
    <div class="goods__img-container" ref="imgContRef">
      <img ref="imgRef" class="img" :src="data.imgUrl" alt="" />
    </div>
    <div class="content-wrapper">
      <div class="goods__well">
        <div class="goods__name">{{ data.name }}</div>
        <div class="goods__extra">
          <span class="count">月售{{ data.sellCount }}</span>
          <span>评分{{ data.rating }}</span>
        </div>
        <div class="goods__price">
          <div class="price">
            <span class="now"
              >¥<span>{{ data.price }}</span></span
            >
            <span class="old"> ¥{{ data.oldPrice }} </span>
          </div>
          <CartControl :data="data"></CartControl>
        </div>
      </div>
      <div class="goods__well">
        <div class="goods__well__row">
          <div class="label">红包</div>
        </div>
        <div class="goods__well__row">
          <div class="label">保障</div>
          <div>不支持七天无理由退换</div>
        </div>
      </div>
    </div>
    <ShopCart />
  </div>
</template>
<style lang="scss" scoped>
.goods-page {
  .rebound {
    transition: 0.2s ease-out;
  }
  .content-wrapper {
    padding: 0 8px 75px 8px;
  }
  .goods {
    &__img-container {
      position: relative;
      height: 250px;
      overflow: hidden;
      background-color: cornflowerblue;
      .img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
    }

    &__well {
      background: white;
      border-radius: 8px;
      padding: 18px;
      margin-top: 8px;
      &__row {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .label {
          color: gray;
          font-size: 13px;
          margin: 0 15px 0 5px;
        }
      }
    }
    &__name {
      font-size: 18px;
    }
    &__extra {
      margin: 8px 0;
      font-size: 12px;
      color: gray;
      .coun {
        margin-right: 6px;
      }
    }
    &__price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        align-items: baseline;
        .now {
          color: red;
          margin-right: 4px;
          span {
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
      .old {
        color: gray;
        text-decoration: line-through;
      }
    }
  }
}
</style>
