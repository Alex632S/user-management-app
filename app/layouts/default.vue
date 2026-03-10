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
              to="/users"
              icon="team"
              :active="route.path.startsWith('/users')"
            >
              Учётные записи
            </SidebarNavItem>
            <SidebarNavItem
              to="/groups"
              icon="projects"
              :active="route.path.startsWith('/groups')"
            >
              Группы
            </SidebarNavItem>
            <SidebarNavItem
              to="/policys"
              icon="calendar"
              :active="route.path.startsWith('/policys')"
            >
              Политики безопасности
            </SidebarNavItem>
            <SidebarNavItem
              to="/sessions"
              icon="documents"
              :active="route.path.startsWith('/sessions')"
            >
              Активные сессии пользователей
            </SidebarNavItem>
            <SidebarNavItem
              to="/auditlogs"
              icon="settings"
              :active="route.path.startsWith('/auditlogs')"
            >
              Запись о действиях
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
        id="sidebar-mobile"
        ref="mobileSidebar"
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
      <main class="flex-1 flex flex-col overflow-hidden lg:pl-0">
        <!-- Хедер с заголовком (фиксированный) -->
        <div
          class="flex-none border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8"
        >
          <!-- Кнопка мобильного меню и кнопка создания пользователя -->
          <div class="flex justify-between items-center mb-4">
            <button
              class="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              @click="openMobileSidebar"
            >
              <span class="sr-only">Открыть меню</span>
              <Icon name="menu" size="6" />
            </button>
          </div>
          <div class="flex justify-between">
            <div>
              <h1 class="text-2xl font-bold tracking-tight text-gray-900">
                {{ pageTitle }}
              </h1>
              <p class="mt-1 text-sm text-gray-500">
                {{ pageDescription }}
              </p>
            </div>
            <button
              class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              @click="openCreateModal"
            >
              <Icon name="plus" size="5" class="mr-2" />
              Создать пользователя
            </button>
          </div>
          <!-- Заголовок раздела -->

          <!-- Хлебные крошки -->
          <div class="bg-white pt-5">
            <nav class="flex" aria-label="Breadcrumb">
              <ol role="list" class="flex items-center space-x-1">
                <!-- Home -->
                <li>
                  <div>
                    <a
                      href="#"
                      class="text-gray-400 hover:text-gray-500 flex items-center"
                    >
                      <svg
                        class="h-5 w-5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        />
                      </svg>
                      <span class="sr-only">Home</span>
                    </a>
                  </div>
                </li>

                <!-- Projects -->
                <li>
                  <div class="flex items-center">
                    <svg
                      class="h-5 w-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      />
                    </svg>
                    <a
                      href="#"
                      class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Projects
                    </a>
                  </div>
                </li>

                <!-- Current page -->
                <li>
                  <div class="flex items-center">
                    <svg
                      class="h-5 w-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      />
                    </svg>
                    <span
                      class="ml-4 text-sm font-medium text-gray-900"
                      aria-current="page"
                    >
                      Project Nero
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <!-- Контейнер для основного контента с прокруткой -->
        <div class="flex-1 overflow-hidden">
          <slot />
        </div>
      </main>
    </div>

    <UserFormModal
      v-if="isModalOpen"
      :mode="modalMode"
      :initial-data="
        modalMode === 'edit' && selectedUser ? selectedUser : undefined
      "
      :loading="modalLoading"
      @close="closeModal"
      @save="handleSaveUser"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUsersPage } from '~/composables/useUsersPage'
  import type { ExtendedUser, User, UserFormData } from '~/types/user'

  // Новые компоненты
  import MobileSidebar from '~/components/ui/organisms/MobileSidebar.vue'
  import Sidebar from '~/components/ui/organisms/Sidebar/Sidebar.vue'
  import Icon from '~/components/ui/atoms/Icon.vue'
  import UserFormModal from '~/components/ui/organisms/UserFormModal.vue'
  import SidebarNavGroup from '~/components/ui/organisms/Sidebar/SidebarNavGroup.vue'
  import SidebarNavItem from '~/components/ui/organisms/Sidebar/SidebarNavItem.vue'
  import SidebarUser from '~/components/ui/organisms/Sidebar/SidebarUser.vue'

  const route = useRoute()

  const router = useRouter()
  const mobileSidebar = ref<InstanceType<typeof MobileSidebar> | null>(null)
  const searchQuery = ref('')
  const sortBy = ref('name')

  const {
    users,
    selectedUser,
    filteredUsers: composableFilteredUsers,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    setSelectedUser
  } = useUsersPage()

  // Состояние модального окна
  const isModalOpen = ref(false)
  const modalMode = ref<'create' | 'edit'>('create')
  const modalLoading = ref(false)

  // Состояние уведомлений
  interface Notification {
    show: boolean
    type: 'success' | 'error'
    message: string
    errors: Record<string, string> | null
  }

  const notification = ref<Notification>({
    show: false,
    type: 'success',
    message: '',
    errors: null
  })

  // Вычисляемые свойства
  const pageTitle = computed((): string => {
    return 'Участники команды'
  })

  const pageDescription = computed((): string => {
    return 'Просмотр информации о членах команды и их активности'
  })

  const filteredUsers = computed((): ExtendedUser[] => {
    let filtered = composableFilteredUsers.value

    // Дополнительная фильтрация по поиску
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

  onMounted(async () => {
    await fetchUsers()
  })

  const selectUser = (user: ExtendedUser | User): void => {
    setSelectedUser(user as ExtendedUser)
  }

  const handleSearch = (query: string): void => {
    searchQuery.value = query
  }

  const handleSort = (value: string): void => {
    sortBy.value = value
  }

  const openCreateModal = (): void => {
    modalMode.value = 'create'
    isModalOpen.value = true
  }

  const handleUpdateUser = async (
    id: string,
    data: Partial<UserFormData>
  ): Promise<void> => {
    const result = await updateUser(id, data)
    if (result.success) {
      showNotification('success', 'Пользователь успешно обновлен')
    } else {
      showNotification('error', result.error || 'Ошибка при обновлении')
    }
  }

  const confirmDelete = async (user: ExtendedUser | User): Promise<void> => {
    if (confirm(`Удалить пользователя ${user.name}?`)) {
      const result = await deleteUser(user.id)
      if (result.success) {
        showNotification('success', 'Пользователь успешно удален')
      } else {
        showNotification('error', result.error || 'Ошибка при удалении')
      }
    }
  }

  const handleSaveUser = async (formData: UserFormData): Promise<void> => {
    modalLoading.value = true

    let result
    if (modalMode.value === 'create') {
      result = await createUser(formData)
    } else if (selectedUser.value) {
      result = await updateUser(selectedUser.value.id, formData)
    }

    modalLoading.value = false

    if (result?.success) {
      closeModal()
      showNotification(
        'success',
        modalMode.value === 'create'
          ? 'Пользователь успешно создан'
          : 'Пользователь успешно обновлен'
      )
    } else if (result?.errors) {
      // Показываем ошибки валидации в форме
      showNotification(
        'error',
        result.error || 'Ошибка валидации',
        result.errors
      )
    } else {
      showNotification('error', result?.error || 'Произошла ошибка')
    }
  }

  const closeModal = (): void => {
    isModalOpen.value = false
  }

  const showNotification = (
    type: 'success' | 'error',
    message: string,
    errors: Record<string, string> | null = null
  ): void => {
    notification.value = {
      show: true,
      type,
      message,
      errors
    }

    if (type === 'success') {
      setTimeout(() => {
        notification.value.show = false
      }, 3000)
    }
  }

  const handleMessage = (user: ExtendedUser | User): void => {
    // Handle message action for user
    console.log('Message sent to:', user.name)
  }

  const handleProfile = (user: ExtendedUser | User): void => {
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
</script>
