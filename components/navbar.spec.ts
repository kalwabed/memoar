// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from 'nuxt-vitest/utils'
import Navbar from './navbar.vue'

describe('components/navbar.vue', () => {
  it('should render navbar', async () => {
    const wrapper = await mountSuspended(Navbar)
    expect(wrapper.html()).toContain('nav')
  })
})
