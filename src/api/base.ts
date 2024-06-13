import axios from 'axios'
import { Dialog, showDialog } from 'vant'
const instance = axios.create({
  baseURL: '/api'
})

//拦截请求返回数据
instance.interceptors.response.use((response) => {
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
})

export default instance
