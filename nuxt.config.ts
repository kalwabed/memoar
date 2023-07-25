// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind.css'],
  modules: ['@vueuse/nuxt', '@nuxtjs/supabase', '@unocss/nuxt'],
  experimental: {
    typedPages: true,
    viewTransition: true,
    typescriptBundlerResolution: true,
  },
  imports: {
    dirs: ['./store'],
  },
  // routeRules: {
  //   '/': {
  //     prerender: false,
  //   },
  // },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  },
  vue: {
    propsDestructure: true,
    defineModel: true,
  },
  typescript: {
    strict: false,
  },
})
