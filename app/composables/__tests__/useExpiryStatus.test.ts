import { describe, expect, it } from 'vitest'
import { getExpiryStatus } from '../useExpiryStatus'

describe('getExpiryStatus', () => {
  it('returns red for expired documents', () => {
    expect(getExpiryStatus('2026-05-31')).toBe('red')
    expect(getExpiryStatus('2026-05-29')).toBe('red')
  })

  it('returns amber for documents within 30 days', () => {
    expect(getExpiryStatus('2026-06-11')).toBe('amber')
  })

  it('returns green for documents beyond 30 days', () => {
    expect(getExpiryStatus('2026-10-14')).toBe('green')
  })
})
