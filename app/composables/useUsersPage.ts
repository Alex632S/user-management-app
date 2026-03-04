import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type {
  ExtendedUser,
  UserFilters,
  OperationResult,
  UserStats,
  UserFormData,
  UserResponse,
  User
} from '~/types/user'
import * as userApi from '~/api/users'

export function useUsersPage() {
  // Состояния с правильными типами
  const users: Ref<ExtendedUser[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const selectedUser: Ref<ExtendedUser | null> = ref(null)
  const filters: Ref<UserFilters> = ref({
    role: 'all',
    status: 'all',
    search: ''
  })
  const stats: Ref<UserStats | null> = ref(null)

  // Загрузка пользователей
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await userApi.getUsers()
      // Предполагаем, что API возвращает ExtendedUser[]
      users.value = response.users as ExtendedUser[]

      // Выбираем первого пользователя по умолчанию
      if (users.value.length > 0 && !selectedUser.value) {
        selectedUser.value = users.value[0] ?? null
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      console.error('Error fetching users:', e)

      // Для разработки используем моковые данные
      if (import.meta.dev) {
        users.value = mockUsers
        if (users.value.length > 0 && !selectedUser.value) {
          selectedUser.value = users.value[0] ?? null
        }
      }
    } finally {
      loading.value = false
    }
  }

  // Создание пользователя
  const createUser = async (
    userData: UserFormData
  ): Promise<OperationResult<ExtendedUser>> => {
    loading.value = true
    try {
      // Создаем пользователя через API
      const response = await userApi.createUser({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        phone: userData.phone
      })

      // Преобразуем ответ в ExtendedUser
      const newUser: ExtendedUser = {
        ...(response.user as User),
        department: userData.department || '',
        location: userData.location || '',
        projects: '0',
        commits: '0'
      }

      users.value.push(newUser)
      selectedUser.value = newUser

      return { success: true, data: newUser }
    } catch (e: any) {
      console.error('Error creating user:', e)
      return {
        success: false,
        error: e.message || 'Ошибка при создании пользователя',
        errors: e.errors
      }
    } finally {
      loading.value = false
    }
  }

  // Обновление пользователя
  const updateUser = async (
    id: string,
    userData: Partial<UserFormData>
  ): Promise<OperationResult<ExtendedUser>> => {
    loading.value = true
    try {
      const response = await userApi.updateUser(id, {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        phone: userData.phone
      })

      const index = users.value.findIndex((u) => u.id === id)
      if (index !== -1) {
        const currentUser = users.value[index]!
        users.value[index] = {
          ...currentUser,
          ...(response.user as User),
          department: userData.department ?? currentUser.department,
          location: userData.location ?? currentUser.location,
          projects: currentUser.projects,
          commits: currentUser.commits
        }
      }

      if (selectedUser.value?.id === id && index !== -1) {
        selectedUser.value = users.value[index] ?? null
      }

      return { success: true, data: users.value[index]! }
    } catch (e: any) {
      console.error('Error updating user:', e)
      return {
        success: false,
        error: e.message || 'Ошибка при обновлении пользователя',
        errors: e.errors
      }
    } finally {
      loading.value = false
    }
  }

  // Блокировка пользователя
  const blockUser = async (id: string): Promise<OperationResult> => {
    try {
      const response = await userApi.blockUser(id)
      const userIndex = users.value.findIndex((u) => u.id === id)

      if (userIndex !== -1) {
        users.value[userIndex]!.status = 'blocked'
        users.value[userIndex]!.lastLogin = (
          response.user as ExtendedUser
        ).lastLogin
      }

      if (selectedUser.value?.id === id && selectedUser.value) {
        selectedUser.value.status = 'blocked'
        selectedUser.value.lastLogin = (response.user as ExtendedUser).lastLogin
      }

      return { success: true }
    } catch (e: any) {
      console.error('Error blocking user:', e)
      return { success: false, error: e.message || 'Ошибка при блокировке' }
    }
  }

  // Удаление пользователя
  const deleteUser = async (id: string): Promise<OperationResult> => {
    try {
      await userApi.deleteUser(id)
      users.value = users.value.filter((u) => u.id !== id)

      if (selectedUser.value?.id === id) {
        selectedUser.value = users.value[0] || null
      }

      return { success: true }
    } catch (e: any) {
      console.error('Error deleting user:', e)
      return { success: false, error: e.message || 'Ошибка при удалении' }
    }
  }

  // Получение статистики
  const fetchStats = async (): Promise<void> => {
    try {
      stats.value = await userApi.getUserStats()
    } catch (e) {
      console.error('Error fetching stats:', e)
    }
  }

  // Фильтрация пользователей
  const filteredUsers = computed<ExtendedUser[]>(() => {
    let filtered = [...users.value]

    if (filters.value.search) {
      const query = filters.value.search.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.toLowerCase().includes(query) ||
          (user.department && user.department.toLowerCase().includes(query))
      )
    }

    if (filters.value.role !== 'all') {
      filtered = filtered.filter((user) => user.role === filters.value.role)
    }

    if (filters.value.status !== 'all') {
      filtered = filtered.filter((user) => user.status === filters.value.status)
    }

    return filtered
  })

  // Моковые данные для разработки
  const mockUsers: ExtendedUser[] = [
    {
      id: 'michael',
      name: 'Michael Foster',
      role: 'admin',
      email: 'michael.foster@example.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      location: 'San Francisco, CA',
      projects: '24',
      commits: '1432',
      status: 'active',
      registeredAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'lindsay',
      name: 'Lindsay Walton',
      role: 'editor',
      email: 'lindsay.walton@example.com',
      phone: '+1 (555) 234-5678',
      department: 'Product',
      location: 'New York, NY',
      projects: '18',
      commits: '967',
      status: 'active',
      registeredAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'courtney',
      name: 'Courtney Henry',
      role: 'viewer',
      email: 'courtney.henry@example.com',
      phone: '+1 (555) 345-6789',
      department: 'Engineering',
      location: 'Austin, TX',
      projects: '31',
      commits: '2156',
      status: 'blocked',
      registeredAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ]

  return {
    // Состояния
    users,
    loading,
    error,
    selectedUser,
    filters,
    stats,
    filteredUsers,

    // Методы
    fetchUsers,
    createUser,
    updateUser,
    blockUser,
    deleteUser,
    fetchStats,
    setSelectedUser: (user: ExtendedUser | null) => {
      selectedUser.value = user
    },
    setFilters: (newFilters: Partial<UserFilters>) => {
      filters.value = { ...filters.value, ...newFilters }
    }
  }
}
