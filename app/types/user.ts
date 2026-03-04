// Роли пользователей
export type UserRole = 'admin' | 'editor' | 'viewer'

// Статусы пользователей
export type UserStatus = 'active' | 'blocked'

// Базовый пользователь
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  registeredAt: string
  lastLogin: string
  avatar: string
  phone: string
}

// Расширенный пользователь
export interface ExtendedUser extends User {
  department: string
  location: string
  projects: string
  commits: string
}

// Данные для создания нового пользователя (из API)
export interface NewUser {
  name: string
  email: string
  role: UserRole
  status: UserStatus
  phone: string
}

// Данные для обновления пользователя (из API)
export interface UpdateUser {
  name?: string
  email?: string
  role?: UserRole
  status?: UserStatus
  phone?: string
  avatar?: string
}

// Фильтры
export interface UserFilters {
  role: 'all' | UserRole
  status: 'all' | UserStatus
  search: string
}

// Ответ API для списка пользователей
export interface UsersResponse {
  users: (User | ExtendedUser)[]
  total: number
  filters: UserFilters
}

// Ответ API для одного пользователя
export interface UserResponse {
  user: User | ExtendedUser
  message?: string
}

// Статистика
export interface UserStats {
  total: number
  byRole: Record<UserRole, number>
  byStatus: Record<UserStatus, number>
  newThisMonth: number
}

// Запрос на массовое удаление
export interface BatchDeleteRequest {
  ids: string[]
}

// Ответ на массовое удаление
export interface BatchDeleteResponse {
  message: string
  deletedCount: number
  notFoundIds?: string[]
}

// Ошибка API
export interface ApiError {
  message: string
  error: string
  errors?: Record<string, string>
}

// Результаты операций
export interface OperationResult<T = any> {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string>
}

// Для форм (UI)
export interface UserFormData {
  name: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
  department: string
  location: string
}

// Константы для отображения
export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Администратор',
  editor: 'Редактор',
  viewer: 'Наблюдатель'
}

export const STATUS_LABELS: Record<UserStatus, string> = {
  active: 'Активен',
  blocked: 'Заблокирован'
}

export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Infrastructure',
  'Research',
  'Customer Support'
]

export const LOCATIONS = [
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'Seattle, WA',
  'Chicago, IL',
  'Boston, MA',
  'Los Angeles, CA',
  'Denver, CO'
]

// Вспомогательные функции
export function formatPhone(phone: string): string {
  return phone || '—'
}
