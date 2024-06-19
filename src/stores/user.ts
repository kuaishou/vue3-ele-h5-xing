import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUserInfo } from '@/types'
import { useLocalStorage } from '@/use/useLocalStorage'

export interface IuserState {
  userInfo: IUserInfo
  token: string
}
const getDefaultUserInfo: () => IUserInfo = () => ({
  id: '',
  avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  nickname: '请登录',
  username: ''
})

export const useUserStore = defineStore('user', () => {
  //数据持久化
  const {
    value: $userInfo,
    setValue: $setUserInfoValue,
    removeItem: $removeUserInfoItem
  } = useLocalStorage('userInfo', getDefaultUserInfo())

  const { setValue: $setTokenValue, removeItem: $removeTokenItem } = useLocalStorage('token', '')

  const state = ref({
    userInfo: getDefaultUserInfo(),
    token: ''
  })
  const getUserInfo = computed(() => {
    if (!state.value.userInfo || !state.value.userInfo.id) {
      state.value.userInfo = $userInfo.value
    }
    return state.value.userInfo
  })
  const setInfo = ({ token, userInfo }: IuserState) => {
    state.value.userInfo = userInfo
    state.value.token = token
    $setUserInfoValue(userInfo)
    $setTokenValue(token)
  }
  const removeInfo = () => {
    state.value.userInfo = getDefaultUserInfo()
    state.value.token = ''
    $removeUserInfoItem()
    $removeTokenItem()
  }

  return { state, getUserInfo, setInfo, removeInfo }
})
