<script setup lang="ts" name="OpNavBar">
const onclick = () => {
  history.back()
}
</script>

<template>
  <div class="op-nav-bar">
    <VanIcon name="arrow-left" color="#fff" size="20px" @click="onclick"></VanIcon>
  </div>
</template>

<style scoped>
.op-nav-bar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 9999;
}
</style>
