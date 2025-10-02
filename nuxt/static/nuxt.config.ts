// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL || 'something'
    }
  }
})
