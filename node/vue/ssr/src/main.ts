import { createSSRApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createAppRouter } from './router'

export function createApp() {
  const app = createSSRApp(App)
  const router = createAppRouter()
  app.use(router)
  return { app, router }
}
