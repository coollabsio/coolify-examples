import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url: string) {
  const { app, router } = createApp()

  await router.push(url)
  await router.isReady()

  const html = await renderToString(app)
  return { html }
}
