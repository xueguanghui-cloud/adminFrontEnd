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

/**
 * 统计次数
 * @param params
 * @returns Promise
 */
export const noticeCount = (params: any) => {
  return ghRequest.get({ url: 'leave/count' })
}

/**
 * 获取菜单列表
 * @returns Promise
 */
export const getMenuList = () => {
  return ghRequest.get({ url: '/menu/list' })
}

/**
 * 获取用户列表
 * @returns Pormise
 */
export const getUserList = (data: {
  userId: string
  userName: string
  state: number
  pageNum: number
  pageSize: number
}) => {
  return ghRequest.get({ url: '/users/list', params: data })
}

/**
 * 用户删除
 * @param userIds 需要删除的用户ID
 * @returns Pormise
 */
export const userDelete = (userIds: number[]) => {
  return ghRequest.post({ url: '/users/delete', data: userIds })
}

/**
 * 获取部门列表
 * @returns Pormise
 */
export const getDeptList = () => {
  return ghRequest.get({ url: '/dept/list' })
}

/**
 * 获取角色列表
 * @returns Pormise
 */
export const getRoleList = () => {
  return ghRequest.get({ url: '/role/allList' })
}
