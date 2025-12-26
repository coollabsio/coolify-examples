<script setup lang="ts">
const config = useRuntimeConfig();

// Fetch private env vars from server API
const { data: serverEnv } = await useFetch('/api/env');

// Build-time public var (accessible on client)
const buildPublicVar = import.meta.env.BUILD_PUBLIC_VAR || 'default-value';

onMounted(() => {
  console.log('=== Build-time Variables ===');
  console.log('BUILD_PUBLIC_VAR:', buildPublicVar);
  console.log('=== Runtime Variables ===');
  console.log('NUXT_RUNTIME_PRIVATE_VAR:', serverEnv.value?.runtimePrivateVar);
  console.log('NUXT_PUBLIC_RUNTIME_PUBLIC_VAR:', config.public.runtimePublicVar);
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
      <h2>Environment Variable Test</h2>

      <h3>Build-time (baked into bundle)</h3>
      <p><strong>BUILD_PUBLIC_VAR:</strong> {{ buildPublicVar }}</p>

      <h3>Runtime (read at server startup)</h3>
      <p><strong>NUXT_RUNTIME_PRIVATE_VAR:</strong> {{ serverEnv?.runtimePrivateVar }}</p>
      <p><strong>NUXT_PUBLIC_RUNTIME_PUBLIC_VAR:</strong> {{ config.public.runtimePublicVar }}</p>
    </div>
    <NuxtWelcome />
  </div>
</template>
