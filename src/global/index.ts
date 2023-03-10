import type { App } from 'vue'
import registerElementIcon from './register-element-icon'
export function registerApp(app: App) {
  app.use(registerElementIcon)
}
