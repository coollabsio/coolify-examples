<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Build-time public var (available on client)
const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value'

// Runtime vars (fetched from server)
const runtimePrivateVar = ref<string>('loading...')
const runtimePublicVar = ref<string>('loading...')

onMounted(async () => {
  console.log('=== Build-time Variables ===')
  console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar)

  // Fetch runtime vars from server API
  try {
    const res = await fetch('/api/env')
    const data = await res.json()
    runtimePrivateVar.value = data.runtimePrivateVar
    runtimePublicVar.value = data.runtimePublicVar

    console.log('=== Runtime Variables ===')
    console.log('RUNTIME_PRIVATE_VAR:', data.runtimePrivateVar)
    console.log('RUNTIME_PUBLIC_VAR:', data.runtimePublicVar)
  } catch (e) {
    runtimePrivateVar.value = 'error'
    runtimePublicVar.value = 'error'
  }
})
</script>

<template>
  <div>
    <h1>Welcome to Vue SSR with Vue Router</h1>

    <div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
      <h2>Environment Variable Test</h2>

      <h3>Build-time (baked into bundle)</h3>
      <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {{ buildPublicVar }}</p>

      <h3>Runtime (read at server startup)</h3>
      <p><strong>RUNTIME_PRIVATE_VAR:</strong> {{ runtimePrivateVar }}</p>
      <p><strong>RUNTIME_PUBLIC_VAR:</strong> {{ runtimePublicVar }}</p>
    </div>

    <p>
      <router-link to="/about">Go to About</router-link>
    </p>
  </div>
</template>
