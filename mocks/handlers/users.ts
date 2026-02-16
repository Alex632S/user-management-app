import { http, HttpResponse, delay } from 'msw'
import { faker } from '@faker-js/faker'
import { mockUsers } from '../data/users'
import type { User } from '../../types/user'

// Копия для мутаций
const users = [...mockUsers]

export const userHandlers = [
  // GET /api/users
  http.get('/api/users', async () => {
    await delay(600)
    return HttpResponse.json(users)
  }),

  // GET /api/users/:id
  http.get('/api/users/:id', async ({ params }) => {
    await delay(400)
    const user = users.find(u => u.id === params.id)

    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json(user)
  }),

  // POST /api/users
  http.post('/api/users', async ({ request }) => {
    await delay(700)
    const body = await request.json() as Omit<User, 'id' | 'registeredAt' | 'lastLogin' | 'avatar'>

    const newUser: User = {
      id: faker.string.uuid(),
      ...body,
      registeredAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatar: faker.image.avatar()
    }

    users.push(newUser)

    return HttpResponse.json(newUser, { status: 201 })
  }),

  // PUT /api/users/:id
  http.put('/api/users/:id', async ({ params, request }) => {
    await delay(500)
    const body = await request.json() as Partial<User>
    const index = users.findIndex(u => u.id === params.id)

    if (index === -1) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Проверяем, что пользователь существует
    const existingUser = users[index]
    if (!existingUser) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Создаем обновленного пользователя с явными полями
    const updatedUser: User = {
      id: existingUser.id,
      name: body.name ?? existingUser.name,
      email: body.email ?? existingUser.email,
      role: body.role ?? existingUser.role,
      status: body.status ?? existingUser.status,
      registeredAt: body.registeredAt ?? existingUser.registeredAt,
      lastLogin: body.lastLogin ?? existingUser.lastLogin,
      avatar: body.avatar ?? existingUser.avatar
    }

    users[index] = updatedUser

    return HttpResponse.json(updatedUser)
  }),

  // DELETE /api/users/:id
  http.delete('/api/users/:id', async ({ params }) => {
    await delay(400)
    const index = users.findIndex(u => u.id === params.id)

    if (index === -1) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    users.splice(index, 1)

    return HttpResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    )
  })
]
