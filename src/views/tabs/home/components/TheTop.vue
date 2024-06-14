<script setup lang="ts" name="TheTop">
import { ISearchRecomment } from '@/types'
interface Iprops {
  recomments: ISearchRecomment[]
}
defineProps<Iprops>()
</script>

<template>
  <div class="home-top">
    <div class="top">
      <img class="location-icon" src="@/assets/imgs/index_page/location.png" alt="" />
      <div class="location">幸福小区（北一区东南门）</div>
      <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png" alt="" />
      <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" alt="" />
    </div>
    <van-search
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="喜茶 35减2 "
    >
      <template #right-icon>
        <div>搜索</div>
      </template>
    </van-search>
    <div class="search-recommend">
      <div v-for="v in recomments" :key="v.value" class="tag">{{ v.label }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-top {
  background: linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: white;
  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;
    .location-icon {
      width: 24px;
      height: 24px;
    }
    .location {
      flex: 1;
    }
    .shopcart-icon {
      width: 24px;
      height: 24px;
    }
    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }
  .search-recommend {
    display: flex;
    padding: 0 10px 8px;
    .tag {
      font-size: 12px;
      border-radius: 10px;
      background: rgb(242, 242, 242, 0.3);
      padding: 2px 8px;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="scss">
.home-top {
  .van-field__right-icon {
    margin-right: 0;
  }
}
</style>
