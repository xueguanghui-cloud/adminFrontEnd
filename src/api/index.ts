/**
 * API 管理
 */
import ghRequest from '@/service/index'

/**
 * 登录接口
 * @param params 账号和密码
 * @returns Pormise
 */
export const login = (data: { userName: string; userPwd: string }) => {
  return ghRequest.post({ url: '/users/login', data })
}
