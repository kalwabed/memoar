import {
  defineConfig,
  presetWebFonts,
  presetTypography,
  transformerVariantGroup,
  presetUno,
  presetIcons,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  transformers: [transformerVariantGroup(), transformerDirectives()],
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
        mono: 'Fira Mono',
        display: 'MuseoModerno:700',
      },
    }),
    presetTypography({
      cssExtend: {
        a: {
          color: '#2563eb',
        },
        'a:hover': {
          background: '#dbeafe',
        },
        'a:visited': {
          color: '#9333ea',
        },
        code: {
          color: '#c026d3',
          'font-family': '"Fira Mono", monospace',
        },
      },
    }),
  ],
  shortcuts: [
    { container: 'max-w-screen-lg w-full h-full mx-auto px-4 lg:px0' },
    {
      input:
        'block w-full disabled:(cursor-not-allowed opacity-75) focus:(outline-none ring-2 ring-teal-500) b-0 rd-md placeholder-gray-400 text-sm px-2.5 py-2 shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-gray-300',
    },
    { 'form-group': 'flex flex-col gap-1' },
    [
      /^btn-(.*)$/,
      ([, c]) =>
        `bg-${c}-100 inline-flex gap-2 text-${c}-900 py-2 px-4 rd outline-none font-semibold b b-${c}-300 hover:bg-${c}-200 focus:(ring-2 b-transparent) items-center justify-center text-center h-full transition disabled:(opacity-50 cursor-not-allowed)`,
    ],
    { 'btn-sm': 'text-sm py-1 px-3' },
  ],
})
