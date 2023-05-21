// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind-compat.css', 'papercss/dist/paper.min.css'],
  modules: ['@vueuse/nuxt', '@nuxtjs/supabase', '@unocss/nuxt'],
  experimental: {
    typedPages: true,
    viewTransition: true,
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      apiUrl: 'https://api.chatengine.io',
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
})
