// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind.css'],
  modules: ['@vueuse/nuxt', '@nuxtjs/supabase', '@unocss/nuxt'],
  experimental: {
    typedPages: true,
    viewTransition: true,
  },
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
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    css: {
      transformer: 'lightningcss',
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
