<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Сайдбар и основной контент в flex -->
    <div class="flex h-screen">
      <!-- Десктопный сайдбар (скрыт на мобильных) -->
      <Sidebar class="hidden lg:flex">
        <template #logo> User Management </template>

        <template #nav>
          <SidebarNavGroup>
            <SidebarNavItem
              to="/"
              icon="dashboard"
              :active="$route.path === '/'"
            >
              Dashboard
            </SidebarNavItem>
            <SidebarNavItem
              to="/users"
              icon="team"
              :active="$route.path.startsWith('/users')"
            >
              Users
            </SidebarNavItem>
            <SidebarNavItem
              to="/projects"
              icon="projects"
              :active="$route.path.startsWith('/projects')"
            >
              Projects
            </SidebarNavItem>
            <SidebarNavItem
              to="/calendar"
              icon="calendar"
              :active="$route.path.startsWith('/calendar')"
            >
              Calendar
            </SidebarNavItem>
            <SidebarNavItem
              to="/documents"
              icon="documents"
              :active="$route.path.startsWith('/documents')"
            >
              Documents
            </SidebarNavItem>
            <SidebarNavItem
              to="/settings"
              icon="settings"
              :active="$route.path.startsWith('/settings')"
            >
              Settings
            </SidebarNavItem>
          </SidebarNavGroup>
        </template>

        <template #user>
          <SidebarUser
            name="Tom Cook"
            email="tom@example.com"
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </template>
      </Sidebar>

      <!-- Мобильный сайдбар -->
      <MobileSidebar
        ref="mobileSidebar"
        id="sidebar-mobile"
        @close="closeMobileSidebar"
      >
        <template #logo>
          <img
            class="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </template>

        <template #nav-items>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/')"
            >
              <Icon
                name="dashboard"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/users')"
            >
              <Icon
                name="team"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Users
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/projects')"
            >
              <Icon
                name="projects"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Projects
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/calendar')"
            >
              <Icon
                name="calendar"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Calendar
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/documents')"
            >
              <Icon
                name="documents"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Documents
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/settings')"
            >
              <Icon
                name="settings"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Settings
            </a>
          </li>
        </template>

        <template #user>
          <a
            href="#"
            class="flex -mx-6 items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
          >
            <img
              class="h-8 w-8 rounded-full bg-gray-300"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span class="sr-only">Your profile</span>
            <span aria-hidden="true">Tom Cook</span>
          </a>
        </template>
      </MobileSidebar>

      <!-- Основной контент -->
      <main class="flex-1 overflow-hidden lg:pl-0">
        <!-- Хедер с заголовком (фиксированный) -->
        <div
          class="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8"
        >
          <!-- Кнопка мобильного меню и кнопка создания пользователя -->
          <div class="flex justify-between items-center mb-4">
            <button
              @click="openMobileSidebar"
              class="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Открыть меню</span>
              <Icon name="menu" size="6" />
            </button>

            <button
              @click="openCreateModal"
              class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              <Icon name="plus" size="5" class="mr-2" />
              Создать пользователя
            </button>
          </div>

          <!-- Заголовок раздела -->
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            {{ pageTitle }}
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            {{ pageDescription }}
          </p>

          <!-- Хлебные крошки -->
          <nav
            class="mt-3 flex items-center gap-2 text-sm border-t border-gray-100 pt-3"
            aria-label="Breadcrumb"
          >
            <a
              href="#"
              class="font-mono text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors"
              @click.prevent="navigateTo('/')"
            >
              Dashboard
            </a>
            <Icon name="chevron-right" size="4" class="text-gray-400" />
            <a
              href="#"
              class="font-mono text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors"
              @click.prevent="navigateTo('/users')"
            >
              Team
            </a>
            <Icon name="chevron-right" size="4" class="text-gray-400" />
            <span
              class="font-mono text-xs font-medium uppercase tracking-wider text-indigo-600"
            >
              Team Members
            </span>
          </nav>
        </div>

        <!-- Контейнер для основного контента с прокруткой -->
        <div class="h-[calc(100vh-260px)] overflow-y-auto">
          <!-- Состояние загрузки -->
          <div v-if="loading" class="flex items-center justify-center h-64">
            <div class="inline-flex items-center space-x-3 text-gray-600">
              <svg
                class="animate-spin h-6 w-6 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span class="text-lg">Загрузка пользователей...</span>
            </div>
          </div>

          <!-- Ошибка -->
          <div
            v-else-if="error"
            class="m-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Основная область -->
          <div v-else class="flex flex-col lg:flex-row h-full">
            <!-- Левая часть: Поиск + Список пользователей -->
            <div
              class="w-full lg:w-1/3 border-r border-gray-200 h-full flex flex-col"
            >
              <!-- Поиск (фиксированный) -->
              <div
                class="flex-none bg-gray-50 px-4 py-3 sm:px-6 lg:px-8 border-b border-gray-200"
              >
                <SearchInput
                  v-model="searchQuery"
                  placeholder="Поиск участников..."
                  @search="handleSearch"
                />
              </div>

              <!-- Сортировка и счетчик (фиксированный) -->
              <div
                class="flex-none flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 border-b border-gray-200 bg-white"
              >
                <span class="text-xs font-medium text-gray-500"
                  >{{ filteredUsers.length }} участников</span
                >
                <SortDropdown @select="handleSort" />
              </div>

              <!-- Список пользователей (скроллируемый) -->
              <div class="flex-1 overflow-y-auto min-h-0 bg-white">
                <ul role="list" class="divide-y divide-gray-200">
                  <UserListItem
                    v-for="user in filteredUsers"
                    :key="user.id"
                    :user="user"
                    :active="selectedUser?.id === user.id"
                    @click="selectUser"
                  />
                </ul>
              </div>
            </div>

            <!-- Правая часть: Карточка пользователя (скроллируемая) -->
            <div class="w-full lg:w-2/3 bg-gray-50 p-4 lg:p-6 overflow-y-auto">
              <UserCard
                v-if="selectedUser"
                :user="selectedUser"
                @message="handleMessage"
                @profile="handleProfile"
                @edit="openEditModal"
                @delete="confirmDelete"
              />
              <div
                v-else
                class="flex items-center justify-center h-64 text-gray-400"
              >
                Выберите пользователя из списка
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Модальное окно для создания/редактирования пользователя -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div
          class="fixed inset-0 bg-black opacity-30"
          @click="closeModal"
        ></div>

        <div class="relative bg-white rounded-lg max-w-md w-full p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{
              modalMode === 'create'
                ? 'Создать пользователя'
                : 'Редактировать пользователя'
            }}
          </h3>

          <form @submit.prevent="saveUser" class="space-y-4">
            <!-- Имя -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Имя</label>
              <input
                v-model="userForm.name"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="userForm.email"
                type="email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <!-- Роль -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Роль</label
              >
              <select
                v-model="userForm.role"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="admin">Администратор</option>
                <option value="editor">Редактор</option>
                <option value="viewer">Наблюдатель</option>
              </select>
            </div>

            <!-- Статус -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Статус</label
              >
              <select
                v-model="userForm.status"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="active">Активен</option>
                <option value="blocked">Заблокирован</option>
              </select>
            </div>

            <!-- Дополнительные поля -->
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Телефон</label
              >
              <input
                v-model="userForm.phone"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Отдел</label
              >
              <input
                v-model="userForm.department"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Локация</label
              >
              <input
                v-model="userForm.location"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <!-- Кнопки -->
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="modalLoading"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {{ modalLoading ? 'Сохранение...' : 'Сохранить' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { ExtendedUser } from '~/types/user'

  // Существующие компоненты
  import Sidebar from '~/components/ui/organisms/Sidebar/Sidebar.vue'
  import SidebarNavGroup from '~/components/ui/organisms/Sidebar/SidebarNavGroup.vue'
  import SidebarNavItem from '~/components/ui/organisms/Sidebar/SidebarNavItem.vue'
  import SidebarUser from '~/components/ui/organisms/Sidebar/SidebarUser.vue'

  // Новые компоненты
  import MobileSidebar from '~/components/ui/organisms/MobileSidebar.vue'
  import UserCard from '~/components/ui/organisms/UserCard.vue'
  import SearchInput from '~/components/ui/atoms/SearchInput.vue'
  import SortDropdown from '~/components/ui/molecules/SortDropdown.vue'
  import UserListItem from '~/components/ui/molecules/UserListItem.vue'
  import Icon from '~/components/ui/atoms/Icon.vue'

  const route = useRoute()
  const router = useRouter()
  const searchQuery = ref('')
  const sortBy = ref('name')
  const selectedUser = ref<ExtendedUser | null>(null)
  const mobileSidebar = ref<InstanceType<typeof MobileSidebar> | null>(null)

  // Состояния загрузки данных
  const users = ref<ExtendedUser[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Состояния модального окна
  const isModalOpen = ref(false)
  const modalMode = ref<'create' | 'edit'>('create')
  const modalLoading = ref(false)
  const userForm = ref({
    name: '',
    email: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
    status: 'active' as 'active' | 'blocked',
    phone: '',
    department: '',
    location: ''
  })

  // Вычисляемые свойства
  const pageTitle = computed((): string => {
    return 'Участники команды'
  })

  const pageDescription = computed((): string => {
    return 'Просмотр информации о членах команды и их активности'
  })

  const filteredUsers = computed((): ExtendedUser[] => {
    let filtered = [...users.value]

    // Фильтрация по поиску
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (user: ExtendedUser) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query) ||
          (user.department && user.department.toLowerCase().includes(query))
      )
    }

    // Сортировка
    filtered.sort((a: ExtendedUser, b: ExtendedUser) => {
      if (sortBy.value === 'name') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy.value === 'email') {
        return a.email.localeCompare(b.email)
      }
      if (sortBy.value === 'role') {
        return a.role.localeCompare(b.role)
      }
      if (sortBy.value === 'department') {
        return (a.department || '').localeCompare(b.department || '')
      }
      return 0
    })

    return filtered
  })

  // Статистика
  const activeUsers = computed(
    (): number =>
      users.value.filter((user: ExtendedUser) => user.status === 'active')
        .length
  )

  const adminCount = computed(
    (): number =>
      users.value.filter((user: ExtendedUser) => user.role === 'admin').length
  )

  // CRUD методы
  // CRUD методы
  async function fetchUsers(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      users.value = data.map((user: any) => ({
        ...user,
        registeredAt: user.registeredAt || new Date().toISOString(),
        status: user.status === 'inactive' ? 'blocked' : user.status
      })) as ExtendedUser[]

      // Выбираем первого пользователя по умолчанию
      if (users.value.length > 0) {
        // Утверждаем, что users.value[0] существует и имеет тип ExtendedUser
        const firstUser = users.value[0]
        if (firstUser) {
          selectedUser.value = firstUser
        }
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      console.error('Error fetching users:', e)

      // Для разработки используем моковые данные если API не доступно
      if (import.meta.dev) {
        users.value = mockUsers.map((user) => ({
          ...user,
          registeredAt: new Date().toISOString()
        })) as ExtendedUser[]

        if (users.value.length > 0) {
          const firstMockUser = users.value[0]
          if (firstMockUser) {
            selectedUser.value = firstMockUser
          }
        }
      }
    } finally {
      loading.value = false
    }
  }

  async function createUser(userData: any): Promise<void> {
    modalLoading.value = true
    try {
      const newUser = {
        ...userData,
        id: `user-${Date.now()}`,
        registeredAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
        projects: '0',
        commits: '0'
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) throw new Error('Failed to create user')

      const createdUser = await response.json()
      users.value.push(createdUser as ExtendedUser)

      // Выбираем созданного пользователя
      selectedUser.value = createdUser as ExtendedUser

      showNotification('Пользователь успешно создан', 'success')
      closeModal()
    } catch (e) {
      console.error('Error creating user:', e)
      showNotification('Ошибка при создании пользователя', 'error')
    } finally {
      modalLoading.value = false
    }
  }

  async function updateUser(
    id: string,
    userData: Partial<ExtendedUser>
  ): Promise<void> {
    modalLoading.value = true
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (!response.ok) throw new Error('Failed to update user')

      const updatedUser = await response.json()
      const index = users.value.findIndex((u: ExtendedUser) => u.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser as ExtendedUser
      }

      // Обновляем выбранного пользователя
      if (selectedUser.value?.id === id) {
        selectedUser.value = updatedUser as ExtendedUser
      }

      showNotification('Пользователь успешно обновлен', 'success')
      closeModal()
    } catch (e) {
      console.error('Error updating user:', e)
      showNotification('Ошибка при обновлении пользователя', 'error')
    } finally {
      modalLoading.value = false
    }
  }

  async function deleteUser(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete user')

      users.value = users.value.filter((u: ExtendedUser) => u.id !== id)

      // Если удалили выбранного пользователя, выбираем первого
      if (selectedUser.value?.id === id) {
        selectedUser.value = users.value[0] || null
      }

      showNotification('Пользователь успешно удален', 'success')
    } catch (e) {
      console.error('Error deleting user:', e)
      showNotification('Ошибка при удалении пользователя', 'error')
    }
  }

  // Методы для работы с модальным окном
  function openCreateModal(): void {
    modalMode.value = 'create'
    userForm.value = {
      name: '',
      email: '',
      role: 'viewer',
      status: 'active',
      phone: '',
      department: '',
      location: ''
    }
    isModalOpen.value = true
  }

  function openEditModal(user: ExtendedUser): void {
    modalMode.value = 'edit'
    userForm.value = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      department: user.department || '',
      location: user.location || ''
    }
    isModalOpen.value = true
  }

  function confirmDelete(user: ExtendedUser): void {
    if (confirm(`Удалить пользователя ${user.name}?`)) {
      deleteUser(user.id)
    }
  }

  function closeModal(): void {
    isModalOpen.value = false
  }

  async function saveUser(): Promise<void> {
    if (modalMode.value === 'create') {
      await createUser(userForm.value)
    } else if (selectedUser.value) {
      await updateUser(selectedUser.value.id, userForm.value)
    }
  }

  // Уведомления
  function showNotification(message: string, type: 'success' | 'error'): void {
    console.log(`[${type}]`, message)
    alert(message)
  }

  // Остальные методы
  const selectUser = (user: ExtendedUser): void => {
    selectedUser.value = user
  }

  const handleSort = (value: string): void => {
    sortBy.value = value
  }

  const handleSearch = (query: string): void => {
    console.log('Searching:', query)
  }

  const handleMessage = (user: ExtendedUser): void => {
    alert(`Написать ${user.name}`)
  }

  const handleProfile = (user: ExtendedUser): void => {
    router.push(`/users/${user.id}`)
  }

  const openMobileSidebar = (): void => {
    mobileSidebar.value?.open()
  }

  const closeMobileSidebar = (): void => {
    console.log('Mobile sidebar closed')
  }

  const navigateTo = (path: string): void => {
    router.push(path)
    closeMobileSidebar()
  }

  // Моковые данные для разработки
  const mockUsers: Partial<ExtendedUser>[] = [
    {
      id: 'michael',
      name: 'Michael Foster',
      role: 'admin',
      email: 'michael.foster@example.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      location: 'San Francisco, CA',
      projects: '24',
      commits: '1,432',
      status: 'active',
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
      commits: '2,156',
      status: 'blocked',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ]

  // При монтировании загружаем пользователей
  onMounted((): void => {
    fetchUsers()
  })

  // Следим за изменением route
  watch(
    () => route.path,
    (): void => {
      closeMobileSidebar()
    }
  )
</script>

<style scoped>
  /* Стили для скролла */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  /* Медиа-запросы для мобильных устройств */
  @media (max-width: 1023px) {
    .h-\[calc\(100vh-260px\)\] {
      height: auto;
    }
  }
</style>
