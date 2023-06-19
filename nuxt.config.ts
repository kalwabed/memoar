// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind-compat.css'],
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
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  },
  vue: {
    propsDestructure: true,
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
})
