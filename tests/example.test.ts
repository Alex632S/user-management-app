import { describe, it, expect } from 'vitest'

describe('Math operations', () => {
  it('should add numbers correctly', () => {
    const result = 2 + 2
    expect(result).toBe(4)
  })

  it('should check truthy values', () => {
    expect(true).toBe(true)
    expect(false).toBe(false)
  })

  it('should work with objects', () => {
    const user = { name: 'Test', age: 25 }
    expect(user.name).toBe('Test')
    expect(user.age).toBe(25)
  })
})