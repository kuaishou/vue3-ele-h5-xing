import { useLocalStorage } from '@/use/useLocalStorage'
import axios from 'axios'
import { showDialog } from 'vant'
const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use((config) => {
  //请求拦截
  const { value: token } = useLocalStorage('token', '')
  if (config.headers && token.value) {
    config.headers['x-token'] = token.value
  }
  return config
})

//拦截请求返回数据
instance.interceptors.response.use(
  (response) => {
    const { data: _data } = response
    const { data, code, msg } = _data
    //状态吗处理
    if (code !== 0) {
      showDialog({
        message: msg
      }).then(() => {
        //   //关闭弹窗逻辑
      })
      // Dialog.alert({
      //   message: msg
      // }).then(() => {

      // })
      return Promise.reject(msg)
    }

    return data
  },
  (err) => {
    if (err.response && err.response.statue === 401) {
      showDialog({
        message: '请登录'
      }).then(() => {
        //关闭弹窗逻辑
      })
    }
  }
)

export default instance
