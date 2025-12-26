// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Runtime env vars (read at server startup, can change without rebuild)
  // Nuxt auto-maps NUXT_<key> for private and NUXT_PUBLIC_<key> for public vars
  runtimeConfig: {
    runtimePrivateVar: process.env.NUXT_RUNTIME_PRIVATE_VAR || 'default-value',
    public: {
      runtimePublicVar: process.env.NUXT_PUBLIC_RUNTIME_PUBLIC_VAR || 'default-value',
    },
  },

  // Build-time env var (baked into bundle at build, public only)
  vite: {
    define: {
      'import.meta.env.BUILD_PUBLIC_VAR': JSON.stringify(process.env.BUILD_PUBLIC_VAR || 'default-value'),
    },
  },
})
