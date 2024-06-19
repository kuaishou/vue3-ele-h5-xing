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
  <div class="login-page op-fullscreen">
    <VanNavBar title="请登录" left-text="返回" left-arrow @click-left="onClickLeft"></VanNavBar>
    <VanForm class="login-page__form" @submit="onSubmit">
      <VanCellGroup>
        <VanField
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        ></VanField>
        <VanField
          v-model="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        ></VanField>
      </VanCellGroup>
      <div style="margin: 16px">
        <VanButton round block type="primary" native-type="submit">提交</VanButton>
      </div>
    </VanForm>
  </div>
</template>
<style lang="scss" scoped>
.login-page {
  .login-page__form {
    margin-top: 100px;
  }
}
</style>
