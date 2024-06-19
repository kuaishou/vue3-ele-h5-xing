import { auth } from '@/api/user'
import type { IloginInfo } from '@/types'
import type { Ref } from 'vue'
import { computed, unref } from 'vue'

export function useAuth() {
  // const store = userUserStore().
  const user = {}
  // const user = computed(() => store.getUserInfo)
  const login = async (data: IloginInfo) => {
    const { token, userInfo } = await auth(data)
    // store.setInfo({ token, userInfo })
  }
  const loginout = () => {
    // store.removeInfo()
  }
  return {
    user,
    login,
    loginout
  }
}
