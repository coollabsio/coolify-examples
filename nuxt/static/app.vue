<template>
  <div>
    <div style="padding: 20px; background: #f0f0f0; margin: 20px; border-radius: 8px;">
      <h2>APP_URL:</h2>
      <p>{{ config.public.appUrl }}</p>
    </div>
    <NuxtWelcome />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
</script>
