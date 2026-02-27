import { http, HttpResponse, delay } from 'msw'
import { faker } from '@faker-js/faker'
import {
  mockUsers,
  isValidEmail,
  isValidPhone,
  generateExtendedUserData,
  userTemplates
} from '../data/users'
import type {
  User,
  NewUser,
  UpdateUser,
  UserFilters,
  UsersResponse,
  UserResponse,
  UserStats,
  BatchDeleteRequest,
  BatchDeleteResponse,
  ApiError
} from '../../app/types/user'

// Копия для мутаций
const users: User[] = [...mockUsers]

// Вспомогательная функция для генерации аватара
const generateAvatar = (): string => {
  const gender = faker.helpers.arrayElement(['male', 'female'])
  return `https://randomuser.me/api/portraits/${gender}/${faker.number.int({ min: 1, max: 99 })}.jpg`
}

// Вспомогательная функция для валидации пользователя
const validateUserData = (
  userData: Partial<NewUser>,
  isUpdate: boolean = false,
  currentUserId?: string
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  // Для создания проверяем обязательные поля
  if (!isUpdate) {
    const requiredFields: (keyof NewUser)[] = [
      'name',
      'email',
      'role',
      'status',
      'phone'
    ]
    for (const field of requiredFields) {
      if (!userData[field]) {
        errors[field] = 'Поле обязательно для заполнения'
      }
    }
  }

  // Валидация имени (если передано)
  if (userData.name !== undefined && userData.name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
  }

  // Валидация email (если передан)
  if (userData.email !== undefined) {
    if (!isValidEmail(userData.email)) {
      errors.email = 'Некорректный формат email'
    } else {
      // Проверка уникальности email (кроме текущего пользователя при обновлении)
      const emailExists = users.some(
        (u) =>
          u.id !== currentUserId &&
          u.email.toLowerCase() === userData.email?.toLowerCase()
      )
      if (emailExists) {
        errors.email = 'Пользователь с таким email уже существует'
      }
    }
  }

  // Валидация телефона (если передан)
  if (userData.phone !== undefined && !isValidPhone(userData.phone)) {
    errors.phone = 'Некорректный формат телефона'
  }

  // Валидация роли (если передана)
  if (
    userData.role !== undefined &&
    !['admin', 'editor', 'viewer'].includes(userData.role)
  ) {
    errors.role = 'Роль должна быть admin, editor или viewer'
  }

  // Валидация статуса (если передан)
  if (
    userData.status !== undefined &&
    !['active', 'blocked'].includes(userData.status)
  ) {
    errors.status = 'Статус должен быть active или blocked'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export const userHandlers = [
  // GET /api/users - получение всех пользователей с фильтрацией
  http.get('/api/users', async ({ request }) => {
    await delay(600)

    const url = new URL(request.url)
    const role = url.searchParams.get('role') as UserFilters['role']
    const status = url.searchParams.get('status') as UserFilters['status']
    const search = url.searchParams.get('search')?.toLowerCase()
    const extended = url.searchParams.get('extended') === 'true'

    let filteredUsers = [...users]

    // Фильтрация по роли
    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter((u) => u.role === role)
    }

    // Фильтрация по статусу
    if (status && status !== 'all') {
      filteredUsers = filteredUsers.filter((u) => u.status === status)
    }

    // Поиск по имени, email или телефону
    if (search) {
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search) ||
          (u.phone && u.phone.toLowerCase().includes(search))
      )
    }

    // Если запрошены расширенные данные
    const responseData = extended
      ? filteredUsers.map((u) => generateExtendedUserData(u))
      : filteredUsers

    const response: UsersResponse = {
      users: responseData,
      total: filteredUsers.length,
      filters: { role, status, search }
    }

    return HttpResponse.json(response)
  }),

  // GET /api/users/:id
  http.get('/api/users/:id', async ({ request, params }) => {
    await delay(400)

    const url = new URL(request.url)
    const extended = url.searchParams.get('extended') === 'true'
    const userId = params.id as string

    const user = users.find((u) => u.id === userId)

    if (!user) {
      const error: ApiError = {
        message: 'Пользователь не найден',
        error: 'NOT_FOUND'
      }
      return HttpResponse.json(error, { status: 404 })
    }

    const response: UserResponse = {
      user: extended ? generateExtendedUserData(user) : user,
      message: 'Пользователь успешно получен'
    }

    return HttpResponse.json(response)
  }),

  // POST /api/users - создание нового пользователя
  http.post('/api/users', async ({ request }) => {
    await delay(700)

    try {
      const body = (await request.json()) as Partial<NewUser>

      // Валидация данных
      const validation = validateUserData(body)
      if (!validation.valid) {
        const error: ApiError = {
          message: 'Ошибка валидации',
          error: 'VALIDATION_ERROR',
          errors: validation.errors
        }
        return HttpResponse.json(error, { status: 400 })
      }

      // Создание нового пользователя
      const newUser: User = {
        id: faker.string.uuid(),
        name: body.name!,
        email: body.email!.toLowerCase(),
        role: body.role!,
        status: body.status!,
        phone: body.phone!,
        registeredAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        avatar: generateAvatar()
      }

      users.push(newUser)

      const response: UserResponse = {
        user: newUser,
        message: 'Пользователь успешно создан'
      }

      return HttpResponse.json(response, { status: 201 })
    } catch (error) {
      const apiError: ApiError = {
        message: 'Ошибка при создании пользователя',
        error: 'INTERNAL_ERROR'
      }
      return HttpResponse.json(apiError, { status: 500 })
    }
  }),

  // PUT /api/users/:id - полное обновление пользователя
  http.put('/api/users/:id', async ({ params, request }) => {
    await delay(500)

    try {
      const body = (await request.json()) as UpdateUser
      const userId = params.id as string
      const index = users.findIndex((u) => u.id === userId)

      if (index === -1) {
        const error: ApiError = {
          message: 'Пользователь не найден',
          error: 'NOT_FOUND'
        }
        return HttpResponse.json(error, { status: 404 })
      }

      const existingUser = users[index]
      if (!existingUser) {
        const error: ApiError = {
          message: 'Пользователь не найден',
          error: 'NOT_FOUND'
        }
        return HttpResponse.json(error, { status: 404 })
      }

      // Валидация данных
      const validation = validateUserData(body, true, userId)
      if (!validation.valid) {
        const error: ApiError = {
          message: 'Ошибка валидации',
          error: 'VALIDATION_ERROR',
          errors: validation.errors
        }
        return HttpResponse.json(error, { status: 400 })
      }

      // Обновление пользователя
      const updatedUser: User = {
        id: existingUser.id,
        name: body.name ?? existingUser.name,
        email: body.email?.toLowerCase() ?? existingUser.email,
        role: body.role ?? existingUser.role,
        status: body.status ?? existingUser.status,
        phone: body.phone ?? existingUser.phone,
        avatar: body.avatar ?? existingUser.avatar,
        registeredAt: existingUser.registeredAt,
        lastLogin: new Date().toISOString()
      }

      users[index] = updatedUser

      const response: UserResponse = {
        user: updatedUser,
        message: 'Пользователь успешно обновлен'
      }

      return HttpResponse.json(response)
    } catch (error) {
      const apiError: ApiError = {
        message: 'Ошибка при обновлении пользователя',
        error: 'INTERNAL_ERROR'
      }
      return HttpResponse.json(apiError, { status: 500 })
    }
  }),

  // PATCH /api/users/:id - частичное обновление пользователя
  http.patch('/api/users/:id', async ({ params, request }) => {
    await delay(400)

    try {
      const body = (await request.json()) as Partial<UpdateUser>
      const userId = params.id as string
      const index = users.findIndex((u) => u.id === userId)

      if (index === -1) {
        const error: ApiError = {
          message: 'Пользователь не найден',
          error: 'NOT_FOUND'
        }
        return HttpResponse.json(error, { status: 404 })
      }

      const existingUser = users[index]
      if (!existingUser) {
        const error: ApiError = {
          message: 'Пользователь не найден',
          error: 'NOT_FOUND'
        }
        return HttpResponse.json(error, { status: 404 })
      }

      // Валидация только переданных полей
      const validation = validateUserData(body, true, userId)
      if (!validation.valid) {
        const error: ApiError = {
          message: 'Ошибка валидации',
          error: 'VALIDATION_ERROR',
          errors: validation.errors
        }
        return HttpResponse.json(error, { status: 400 })
      }

      // Частичное обновление
      const updatedUser: User = {
        id: existingUser.id,
        name: body.name ?? existingUser.name,
        email: body.email?.toLowerCase() ?? existingUser.email,
        role: body.role ?? existingUser.role,
        status: body.status ?? existingUser.status,
        phone: body.phone ?? existingUser.phone,
        avatar: body.avatar ?? existingUser.avatar,
        registeredAt: existingUser.registeredAt,
        lastLogin: new Date().toISOString()
      }

      users[index] = updatedUser

      const response: UserResponse = {
        user: updatedUser,
        message: 'Пользователь успешно обновлен'
      }

      return HttpResponse.json(response)
    } catch (error) {
      const apiError: ApiError = {
        message: 'Ошибка при обновлении пользователя',
        error: 'INTERNAL_ERROR'
      }
      return HttpResponse.json(apiError, { status: 500 })
    }
  }),

  // DELETE /api/users/:id
  http.delete('/api/users/:id', async ({ params }) => {
    await delay(400)

    const userId = params.id as string
    const index = users.findIndex((u) => u.id === userId)

    if (index === -1) {
      const error: ApiError = {
        message: 'Пользователь не найден',
        error: 'NOT_FOUND'
      }
      return HttpResponse.json(error, { status: 404 })
    }

    const deletedUser = users[index]
    if (!deletedUser) {
      const error: ApiError = {
        message: 'Пользователь не найден',
        error: 'NOT_FOUND'
      }
      return HttpResponse.json(error, { status: 404 })
    }

    users.splice(index, 1)

    const response: UserResponse = {
      user: deletedUser,
      message: 'Пользователь успешно удален'
    }

    return HttpResponse.json(response, { status: 200 })
  }),

  // POST /api/users/:id/block - блокировка пользователя
  http.post('/api/users/:id/block', async ({ params }) => {
    await delay(300)

    const userId = params.id as string
    const index = users.findIndex((u) => u.id === userId)

    if (index === -1) {
      const error: ApiError = {
        message: 'Пользователь не найден',
        error: 'NOT_FOUND'
      }
      return HttpResponse.json(error, { status: 404 })
    }

    const user = users[index]
    if (!user) {
      const error: ApiError = {
        message: 'Пользователь не найден',
        error: 'NOT_FOUND'
      }
      return HttpResponse.json(error, { status: 404 })
    }

    user.status = 'blocked'
    user.lastLogin = new Date().toISOString()

    const response: UserResponse = {
      user: user,
      message: 'Пользователь заблокирован'
    }

    return HttpResponse.json(response)
  }),

  // POST /api/users/:id/unblock - разблокировка пользователя
  http.post('/api/users/:id/unblock', async ({ params }) => {
    await delay(300)

    const userId = params.id as string
    const index = users.findIndex((u) => u.id === userId)

    if (index === -1) {
      const error: ApiError = {
        message: 'Пользователь не найден',
        error: 'NOT_FOUND'
      }
      return HttpResponse.json(error, { status: 404 })
    }

    const user = users[index]
    if (!user) {
      const error: ApiError = {
        message: 'Пользователь не найден',
        error: 'NOT_FOUND'
      }
      return HttpResponse.json(error, { status: 404 })
    }

    user.status = 'active'
    user.lastLogin = new Date().toISOString()

    const response: UserResponse = {
      user: user,
      message: 'Пользователь разблокирован'
    }

    return HttpResponse.json(response)
  }),

  // GET /api/users/stats - статистика по пользователям
  http.get('/api/users/stats', async () => {
    await delay(300)

    const now = new Date()
    const stats: UserStats = {
      total: users.length,
      byRole: {
        admin: users.filter((u) => u.role === 'admin').length,
        editor: users.filter((u) => u.role === 'editor').length,
        viewer: users.filter((u) => u.role === 'viewer').length
      },
      byStatus: {
        active: users.filter((u) => u.status === 'active').length,
        blocked: users.filter((u) => u.status === 'blocked').length
      },
      newThisMonth: users.filter((u) => {
        const registered = new Date(u.registeredAt)
        return (
          registered.getMonth() === now.getMonth() &&
          registered.getFullYear() === now.getFullYear()
        )
      }).length
    }

    return HttpResponse.json(stats)
  }),

  // POST /api/users/batch-delete - массовое удаление
  http.post('/api/users/batch-delete', async ({ request }) => {
    await delay(800)

    try {
      const { ids } = (await request.json()) as BatchDeleteRequest

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        const error: ApiError = {
          message: 'Не указаны ID пользователей для удаления',
          error: 'INVALID_REQUEST'
        }
        return HttpResponse.json(error, { status: 400 })
      }

      let deletedCount = 0
      const notFoundIds: string[] = []

      ids.forEach((id) => {
        const index = users.findIndex((u) => u.id === id)
        if (index !== -1) {
          users.splice(index, 1)
          deletedCount++
        } else {
          notFoundIds.push(id)
        }
      })

      const response: BatchDeleteResponse = {
        message: `Удалено пользователей: ${deletedCount}`,
        deletedCount,
        notFoundIds: notFoundIds.length > 0 ? notFoundIds : undefined
      }

      return HttpResponse.json(response)
    } catch (error) {
      const apiError: ApiError = {
        message: 'Ошибка при массовом удалении',
        error: 'INTERNAL_ERROR'
      }
      return HttpResponse.json(apiError, { status: 500 })
    }
  }),

  // GET /api/users/templates - получение шаблонов пользователей
  http.get('/api/users/templates', async () => {
    await delay(200)

    return HttpResponse.json({
      templates: userTemplates,
      roles: ['admin', 'editor', 'viewer'],
      statuses: ['active', 'blocked']
    })
  })
]
