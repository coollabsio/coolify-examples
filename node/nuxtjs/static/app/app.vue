<script setup lang="ts">
const config = useRuntimeConfig();

onMounted(() => {
  console.log('TEST_ENV_VAR:', config.public.testEnvVar);
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
      <h2>Environment Variable Test</h2>
      <p><strong>TEST_ENV_VAR:</strong> {{ config.public.testEnvVar }}</p>
    </div>
    <NuxtWelcome />
  </div>
</template>
