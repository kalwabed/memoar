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
  shortcuts: [
    { container: 'max-w-screen-lg w-full h-full mx-auto px-4 lg:px0' },
    [
      /^btn-(.*)$/,
      ([, c]) =>
        `bg-${c}-200 text-${c}-900 py-2 px-4 rd outline-none font-semibold b b-${c}-300 hover:bg-${c}-100 transition`,
    ],
  ],
})
