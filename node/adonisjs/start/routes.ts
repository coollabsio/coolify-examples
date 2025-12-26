/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Runtime env vars (read at server startup)
const runtimePrivateVar = process.env.RUNTIME_PRIVATE_VAR || 'default-value'
const runtimePublicVar = process.env.RUNTIME_PUBLIC_VAR || 'default-value'

console.log('=== Runtime Variables ===')
console.log('RUNTIME_PRIVATE_VAR:', runtimePrivateVar)
console.log('RUNTIME_PUBLIC_VAR:', runtimePublicVar)

router.get('/', async () => {
  return {
    message: 'Hello from AdonisJS!',
    runtimePrivateVar,
    runtimePublicVar,
  }
})

router.get('/health', async () => {
  return { status: 'ok' }
})
