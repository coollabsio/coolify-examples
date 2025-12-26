<script setup lang="ts">
import { onMounted } from 'vue'

const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || 'default-value'

onMounted(() => {
  console.log('=== Build-time Variables ===')
  console.log('VITE_BUILD_PUBLIC_VAR:', buildPublicVar)
})
</script>

<template>
  <div>
    <h1>Welcome to Vue with Vue Router</h1>

    <div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
      <h2>Environment Variable Test</h2>

      <h3>Build-time (baked into bundle)</h3>
      <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {{ buildPublicVar }}</p>

      <p style="color: #666; font-size: 14px;">
        Note: Static sites only support build-time env vars (no server at runtime)
      </p>
    </div>

    <p>
      <router-link to="/about">Go to About</router-link>
    </p>
  </div>
</template>
