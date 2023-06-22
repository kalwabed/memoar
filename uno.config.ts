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
    { input: 'px-4 py-2 rd b b-gray3 hover:b-gray4 transition outline-none focus:(ring-2 b-transparent)' },
    [
      /^btn-(.*)$/,
      ([, c]) =>
        `bg-${c}-100 inline-flex gap-2 text-${c}-900 py-2 px-4 rd outline-none font-semibold b b-${c}-300 hover:bg-${c}-200 focus:(ring-2 b-transparent) items-center justify-center text-center h-full transition`,
    ],
  ],
})
