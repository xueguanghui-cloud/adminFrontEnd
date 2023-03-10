import { defineStore } from 'pinia'

interface IUser {
  userId: number //用户ID,自增长
  userName: string //用户名称
  userPwd: string //用户密码,md5加密
  userEmail: string //用户邮箱
  mobile: string //手机号
  sex: number //性别 0:男 1:女
  deptId: string[] //部门
  job: string //岗位
  state: number // 1:在职 2:离职 3:试用期
  role: number // 用户角色 0: 系统管理员 1: 普通用户
  roleList: string[] //系统角色
  token: string // 用户token
  createTime: string //创建时间
  lastLoginTime: string //更新时间
  remark: any
}

export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {} as IUser | null
    }
  },
  getters: {},
  actions: {
    setUserInfo(userInfo: IUser | null) {
      this.userInfo = userInfo
    }
  },
  persist: {
    paths: ['userInfo']
  }
})
