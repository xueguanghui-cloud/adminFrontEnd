import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state: () => {
    return {
      msg: 'main message'
    }
  },
  getters: {},
  actions: {}
})
