import { it, expect } from 'vitest'
import { uniqueUsername } from '~/utils/unique-codegen'
import { generateSlug } from '~/utils/slugify'

it('should return unique username', () => {
  const username = uniqueUsername('yes no')
  expect(username).toContain('yesno')
})

it('should return valid slug', () => {
  const slug = generateSlug('kebun binatang 1')
  expect(slug).toContain('kebun-binatang-1')
})
