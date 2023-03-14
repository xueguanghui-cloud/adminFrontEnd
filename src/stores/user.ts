import { defineStore } from 'pinia'
import type { IUser } from './type'

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
