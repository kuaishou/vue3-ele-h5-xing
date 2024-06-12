<script setup lang="ts">
import { ref, watch } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
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
  <RouterView>
    <div class="top">{{ active }}</div>
  </RouterView>
  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="oder" icon="search">订单</TabbarItem>
    <TabbarItem name="me" icon="friends-o">我的</TabbarItem>
    <!-- <TabbarItem name="setting" icon="setting-o">标签</TabbarItem> -->
  </Tabbar>
</template>
<style scoped>
.top {
  text-align: center;
}
</style>
