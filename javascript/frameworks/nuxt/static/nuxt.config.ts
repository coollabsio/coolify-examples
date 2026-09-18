// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL || "something",
    },
  },
});
