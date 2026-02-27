export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'blocked'
  registeredAt: string
  avatar?: string
  lastLogin?: string
  phone?: string // Добавляем телефон
}

// Для создания нового пользователя (обязательные поля)
export type NewUser = Omit<
  User,
  'id' | 'registeredAt' | 'lastLogin' | 'avatar'
> & {
  phone: string // Делаем телефон обязательным при создании
}

// Для обновления пользователя (все поля опциональны)
export type UpdateUser = Partial<Omit<User, 'id'>> & {
  id: string // ID обязателен для обновления
}

// Расширенный тип для карточки пользователя (как в asdf.html)
export interface ExtendedUser extends User {
  phone: string // В расширенной версии телефон обязателен
  department: string
  location: string
  projects: string
  commits: string
}

// Тип для фильтрации пользователей
export interface UserFilters {
  role?: 'admin' | 'editor' | 'viewer' | 'all'
  status?: 'active' | 'blocked' | 'all'
  search?: string
}

// Тип для статистики пользователей
export interface UserStats {
  total: number
  byRole: {
    admin: number
    editor: number
    viewer: number
  }
  byStatus: {
    active: number
    blocked: number
  }
  newThisMonth: number
}

// Тип для ответа API со списком пользователей
export interface UsersResponse {
  users: User[]
  total: number
  filters?: UserFilters
}

// Тип для ответа API с одним пользователем
export interface UserResponse {
  user: User
  message?: string
}

// Тип для массового удаления
export interface BatchDeleteRequest {
  ids: string[]
}

export interface BatchDeleteResponse {
  message: string
  deletedCount: number
  notFoundIds?: string[]
}

// Типы для валидации
export interface ValidationError {
  field: string
  message: string
}

export interface ApiError {
  message: string
  error: string
  errors?: Record<string, string>
  validationErrors?: ValidationError[]
}

// Типы для формы создания/редактирования
export interface UserFormData {
  name: string
  email: string
  role: User['role']
  status: User['status']
  phone: string
  avatar?: File | string | null
}

// Функция для преобразования User в ExtendedUser (для карточки)
export const toExtendedUser = (
  user: User,
  extendedData?: Partial<ExtendedUser>
): ExtendedUser => {
  return {
    ...user,
    phone: user.phone || extendedData?.phone || '+7 (999) 999-99-99',
    department: extendedData?.department || 'Engineering',
    location: extendedData?.location || 'San Francisco, CA',
    projects: extendedData?.projects || '0',
    commits: extendedData?.commits || '0'
  }
}

// Типы для констант (для использования в шаблонах)
export const USER_ROLES = {
  ADMIN: 'admin' as const,
  EDITOR: 'editor' as const,
  VIEWER: 'viewer' as const
} as const

export const USER_STATUSES = {
  ACTIVE: 'active' as const,
  BLOCKED: 'blocked' as const
} as const

// Русские названия для отображения
export const ROLE_LABELS: Record<User['role'], string> = {
  admin: 'Администратор',
  editor: 'Редактор',
  viewer: 'Наблюдатель'
}

export const STATUS_LABELS: Record<User['status'], string> = {
  active: 'Активен',
  blocked: 'Заблокирован'
}

// Цвета для статусов (для Tailwind)
export const STATUS_COLORS: Record<User['status'], string> = {
  active: 'green',
  blocked: 'red'
}

// Валидация email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Валидация телефона (поддерживает разные форматы)
export const isValidPhone = (phone: string): boolean => {
  // Очищаем от всех нецифровых символов кроме +
  const cleaned = phone.replace(/[^\d+]/g, '')
  // Проверяем длину (от 10 до 15 цифр) и наличие кода
  return /^\+?\d{10,15}$/.test(cleaned)
}

// Форматирование телефона для отображения
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{1,3})(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
  }
  return phone
}
