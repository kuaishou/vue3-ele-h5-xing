import { auth } from '@/api/user'
import { useUserStore } from '@/stores/user'
import type { IloginInfo } from '@/types'
import { computed } from 'vue'

export function useAuth() {
  const store = useUserStore()
  const user = computed(() => store.getUserInfo)
  const login = async (data: IloginInfo) => {
    const { token, userInfo } = await auth(data)
    store.setInfo({ token, userInfo })
  }
  const logout = () => {
    store.removeInfo()
  }
  return {
    user,
    login,
    logout
  }
}
