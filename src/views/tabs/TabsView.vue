<script setup lang="ts">
import { ref, watch } from 'vue'
// import { Tabbar, TabbarItem } from 'vant'
import { RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const active = ref('home')

watch(active, (nv) => {
  router.push({
    name: nv
  })
})
</script>

<template>
  <RouterView />
  <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="oder" icon="search">订单</van-tabbar-item>
    <van-tabbar-item name="me" icon="friends-o">我的</van-tabbar-item>
    <!-- <TabbarItem name="setting" icon="setting-o">标签</TabbarItem> -->
  </van-tabbar>
</template>
<style scoped>
.top {
  text-align: center;
  font-size: 39px;
}
</style>
