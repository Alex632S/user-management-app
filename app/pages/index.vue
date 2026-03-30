<template>
  <div class="h-full flex flex-col">
    <!-- Контейнер для основного контента с прокруткой -->
    <div class="flex-1 overflow-y-auto min-h-0">
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
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
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
            <p class="text-sm text-red-700">
              {{ error }}
            </p>
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

            <!-- Улучшенная кнопка сортировки -->
            <button
              class="inline-flex items-center gap-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-indigo-600 transition-all border border-gray-200"
              @click="toggleSortOrder"
            >
              <span>Сортировка</span>
              <Icon
                :name="sortOrder === 'desc' ? 'chevron-down' : 'chevron-up'"
                size="4"
                color="gray-400"
              />
            </button>
          </div>

          <!-- Список пользователей (скроллируемый) -->
          <div class="flex-1 overflow-y-auto min-h-0 bg-white">
            <ul role="list" class="divide-y divide-gray-200">
              <UserListItem
                v-for="user in sortedUsers"
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
            @save="handleUpdateUser"
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

    <NotificationToast
      v-if="notification.show"
      :type="notification.type"
      :message="notification.message"
      :errors="notification.errors"
      @close="notification.show = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUsersPage } from '~/composables/useUsersPage'
  import type { ExtendedUser, User, UserFormData } from '~/types/user'

  // Новые компоненты
  import type MobileSidebar from '~/components/ui/organisms/MobileSidebar.vue'
  import UserCard from '~/components/ui/organisms/UserCard.vue'
  import SearchInput from '~/components/ui/molecules/SearchInput.vue'
  import UserListItem from '~/components/ui/molecules/UserListItem.vue'
  import Icon from '~/components/ui/atoms/Icon.vue'
  import UserFormModal from '~/components/ui/organisms/UserFormModal.vue'
  import NotificationToast from '~/components/ui/molecules/NotificationToast.vue'

  const router = useRouter()
  const mobileSidebar = ref<InstanceType<typeof MobileSidebar> | null>(null)
  const searchQuery = ref('')
  const sortOrder = ref<'asc' | 'desc'>('desc') // По умолчанию сначала новые

  const {
    users,
    loading,
    error,
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

  // Фильтрация по поиску
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

    return filtered
  })

  // Сортировка по дате создания (используем ID как fallback)
  const sortedUsers = computed((): ExtendedUser[] => {
    const users = [...filteredUsers.value]

    return users.sort((a: ExtendedUser, b: ExtendedUser) => {
      // Для демонстрации используем ID как числовое значение для сортировки
      // В реальном приложении здесь должно быть поле createdAt
      const idA = parseInt(a.id.replace(/\D/g, '')) || 0
      const idB = parseInt(b.id.replace(/\D/g, '')) || 0

      if (sortOrder.value === 'desc') {
        return idB - idA // Сначала новые (больший ID)
      } else {
        return idA - idB // Сначала старые (меньший ID)
      }
    })
  })

  // Переключение порядка сортировки
  const toggleSortOrder = (): void => {
    sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  }

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
</style>
