import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json({
      users: [{ id: 1, name: 'John' }],
      total: 1
    })
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Users API', () => {
  it('should return users', async () => {
    const res = await fetch('/api/users')
    const data = await res.json()

    expect(data.users).toHaveLength(1)
    expect(data.users[0].name).toBe('John')
  })
})
