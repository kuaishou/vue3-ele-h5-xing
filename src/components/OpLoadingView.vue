<script setup lang="ts" name="OpLoadingView">
interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
}

defineProps<IProps>()
</script>

<template>
  <div v-if="loading" class="on-loading-view">
    <slot name="template">
      <div v-if="type === 'loading'" class="loading-wrapper">
        <van-loading />
      </div>
      <div v-if="type === 'skeleton'" class="skeleton-wrapper">
        <van-skeleton :row="10"></van-skeleton>
        <van-skeleton :row="5" title avatar></van-skeleton>
        <van-skeleton :row="5" title></van-skeleton>
      </div>
    </slot>
  </div>
  <slot v-else></slot>
</template>

<style lang="scss" scoped>
.op-loading-view {
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  .skeleton-wrapper {
    padding: 20px 10px;
  }
}
</style>
