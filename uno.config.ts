import { defineConfig, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        inter: 'Inter',
      },
    }),
  ],
})
