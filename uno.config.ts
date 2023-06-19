import { defineConfig, presetWebFonts, transformerVariantGroup, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  transformers: [transformerVariantGroup()],
  presets: [
    presetUno(),
    presetIcons({
      cdn: 'https://esm.sh/',
      scale: 1.2,
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Inter',
      },
    }),
  ],
})
