import type {
  User,
  ExtendedUser,
  UsersResponse,
  UserResponse,
  UserStats,
  NewUser,
  UpdateUser,
  BatchDeleteRequest,
  BatchDeleteResponse,
  ApiError
} from '~/types/user'

// Базовый URL API
const API_BASE = '/api'

// Вспомогательная функция для обработки ответов
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = (await response.json()) as ApiError
    throw new Error(error.message || 'API Error')
  }
  return response.json()
}

// Получить список пользователей
export async function getUsers(params?: {
  role?: string
  status?: string
  search?: string
  extended?: boolean
}): Promise<UsersResponse> {
  const queryParams = new URLSearchParams()
  if (params?.role && params.role !== 'all')
    queryParams.append('role', params.role)
  if (params?.status && params.status !== 'all')
    queryParams.append('status', params.status)
  if (params?.search) queryParams.append('search', params.search)
  if (params?.extended) queryParams.append('extended', 'true')

  const url = `${API_BASE}/users${queryParams.toString() ? '?' + queryParams : ''}`
  const response = await fetch(url)
  return handleResponse<UsersResponse>(response)
}

// Получить пользователя по ID
export async function getUserById(
  id: string,
  extended = false
): Promise<UserResponse> {
  const url = `${API_BASE}/users/${id}${extended ? '?extended=true' : ''}`
  const response = await fetch(url)
  return handleResponse<UserResponse>(response)
}

// Создать пользователя
export async function createUser(userData: NewUser): Promise<UserResponse> {
  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return handleResponse<UserResponse>(response)
}

// Обновить пользователя
export async function updateUser(
  id: string,
  userData: UpdateUser
): Promise<UserResponse> {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return handleResponse<UserResponse>(response)
}

// Заблокировать пользователя
export async function blockUser(id: string): Promise<UserResponse> {
  const response = await fetch(`${API_BASE}/users/${id}/block`, {
    method: 'POST'
  })
  return handleResponse<UserResponse>(response)
}

// Разблокировать пользователя
export async function unblockUser(id: string): Promise<UserResponse> {
  const response = await fetch(`${API_BASE}/users/${id}/unblock`, {
    method: 'POST'
  })
  return handleResponse<UserResponse>(response)
}

// Удалить пользователя
export async function deleteUser(id: string): Promise<UserResponse> {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE'
  })
  return handleResponse<UserResponse>(response)
}

// Получить статистику
export async function getUserStats(): Promise<UserStats> {
  const response = await fetch(`${API_BASE}/users/stats`)
  return handleResponse<UserStats>(response)
}

// Массовое удаление
export async function batchDeleteUsers(
  ids: string[]
): Promise<BatchDeleteResponse> {
  const response = await fetch(`${API_BASE}/users/batch-delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids } as BatchDeleteRequest)
  })
  return handleResponse<BatchDeleteResponse>(response)
}
