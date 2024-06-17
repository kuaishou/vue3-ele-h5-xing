<script setup lang="ts" name="SearchView">
interface Irmits {
  (e: 'cancel'): void
}
const emits = defineEmits<Irmits>()
</script>
<template>
  <div class="search-view" @click="emits('cancel')">搜索页</div>
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
}
</style>
