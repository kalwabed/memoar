import { it, expect, vi } from 'vitest'
import { mockNuxtImport } from 'nuxt-vitest/utils'

mockNuxtImport('useAuthStore', () => {
  return () => true
})

it('should mock useAuthStore', () => {
  expect(useAuthStore()).toMatchInlineSnapshot('true')
})
