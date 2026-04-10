import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
const PORT = Number(process.env.PORT) || 3000

// Runtime env vars (read at server startup)
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || 'default-value'
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || 'default-value'

console.log('=== Runtime Variables ===')
console.log('RUNTIME_PRIVATE_VAR:', RUNTIME_PRIVATE_VAR)
console.log('RUNTIME_PUBLIC_VAR:', RUNTIME_PUBLIC_VAR)

app.get('/', (c) => {
  return c.json({
    message: 'Hello from Hono!',
    runtimePrivateVar: RUNTIME_PRIVATE_VAR,
    runtimePublicVar: RUNTIME_PUBLIC_VAR,
  })
})

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

serve({
  fetch: app.fetch,
  port: PORT,
}, (info) => {
  console.log(`Server running on port ${info.port}`)
})
