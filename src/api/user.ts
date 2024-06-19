import type { IAuth, IloginInfo } from '@/types'
import axios from './base'
export const auth = ({ username, password }: IloginInfo) => {
  return axios.post<IAuth, IAuth>('me_page', {
    username,
    password
  })
}
