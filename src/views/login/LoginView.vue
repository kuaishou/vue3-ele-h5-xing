<script setup lang="ts" name="LoginView">
import type { IloginInfo } from '@/types'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const onClickLeft = () => history.back()
// const { olgin } = useAuth()
const onSubmit = async (data: IloginInfo) => {
  // await login()
}
// const username = ref('')
// const username = ref('')
</script>

<template>
  <div></div>
</template>
<style scoped>
.top {
  text-align: center;
  font-size: 39px;
}
</style>
