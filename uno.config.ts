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
    { 'form-group': 'flex flex-col gap-1' },
  ],
})
