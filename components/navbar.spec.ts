import { describe,it, expect } from "vitest";
import {mockComponent} from 'nuxt-vitest/utils'

describe('Test navbar component', () => {
  it('should render navbar', async () => {
    mockComponent('Btn',() => import('@/components/btn.vue'))
  })
})
