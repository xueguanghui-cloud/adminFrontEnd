import { defineStore } from 'pinia'

interface IUser {
  _id: string
  userId: number
  userName: string
  userEmail: string
  role: [0, 1]
  deptId: string[]
  roleList: string[]
  state: number
  token: string
}

export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: null as IUser | null
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
