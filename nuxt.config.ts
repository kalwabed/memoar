// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind.css'],
  modules: ['@vueuse/nuxt', '@nuxtjs/supabase'],
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
