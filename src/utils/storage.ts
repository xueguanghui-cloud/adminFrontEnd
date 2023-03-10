/**
 * 对Storage的二次封装
 */
import config from '@/config'
export default {
  setItem(key: string, value: any) {
    const storage = this.getStorage()
    storage[key] = value
    localStorage.setItem(config.nameSpace, JSON.stringify(storage))
  },
  getItem(key: string) {
    return this.getStorage()[key]
  },
  clearItem(key: string) {
    const storage = this.getStorage()
    delete storage[key]
    localStorage.setItem(config.nameSpace, JSON.stringify(storage))
  },
  clearAll() {
    localStorage.clear()
  },
  getStorage() {
    return JSON.parse(localStorage.getItem(config.nameSpace) || '{}')
  }
}
