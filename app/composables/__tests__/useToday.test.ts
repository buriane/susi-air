import { describe, expect, it } from 'vitest'
import { useToday } from '../useToday'

describe('useToday', () => {
  it('returns 2026-05-31', () => {
    const today = useToday()
    expect(today.toISOString().slice(0, 10)).toBe('2026-05-31')
  })
})
