// service 统一出口
import GHRequest from './request'
import config from '@/config'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores/user'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

const ghRequest = new GHRequest({
  baseURL: config.baseApi,
  timeout: config.timeOut,
  interceptors: {
    requestInterceptor(config) {
      // 携带token
      const token = userStore().userInfo?.token

      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    reponseInterceptor(response) {
      const { code, data, msg } = response.data
      if (code === 200) {
        return data
      } else if (code === 50001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
          router.push('/login') // 跳转到登录页
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
      } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
      }
    },
    reponseInterceptorCatch(error) {
      return error
    }
  }
})

export default ghRequest
