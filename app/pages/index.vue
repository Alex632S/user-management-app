<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Заголовок -->
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      User Management
    </h1>

    <!-- Состояние загрузки -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-flex items-center space-x-3 text-gray-600">
        <svg class="animate-spin h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-lg">Загрузка пользователей...</span>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div v-else>
      <!-- Статистика -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <!-- Total Users -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Всего пользователей
          </h3>
          <p class="text-3xl font-bold text-gray-900">{{ users.length }}</p>
        </div>

        <!-- Active Users -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Активные
          </h3>
          <p class="text-3xl font-bold text-green-600">{{ activeUsers }}</p>
        </div>

        <!-- Admins -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Администраторы
          </h3>
          <p class="text-3xl font-bold text-purple-600">{{ adminCount }}</p>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="flex flex-wrap gap-3 mb-8">
        <button
          @click="testAPI"
          class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Обновить
        </button>

        <button
          @click="testCreate"
          class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Создать
        </button>

        <button
          @click="testDelete"
          :disabled="!users.length"
          class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Удалить первого
        </button>
      </div>

      <!-- Список пользователей -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="user in users"
          :key="user.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start space-x-4">
              <!-- Аватар -->
              <img
                :src="user.avatar"
                :alt="user.name"
                class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              
              <!-- Информация -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 truncate">
                  {{ user.name }}
                </h3>
                <p class="text-sm text-gray-500 truncate mb-2">
                  {{ user.email }}
                </p>
                
                <!-- Бейджи -->
                <div class="flex flex-wrap gap-2">
                  <!-- Роль -->
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      roleClasses[user.role] || 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ user.role }}
                  </span>
                  
                  <!-- Статус -->
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ user.status === 'active' ? 'Активен' : 'Заблокирован' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { User } from '../../types/user'

// Классы для разных ролей
const roleClasses: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-800',
  editor: 'bg-blue-100 text-blue-800',
  viewer: 'bg-gray-100 text-gray-800'
}

const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const activeUsers = computed(() =>
  users.value.filter((user: User) => user.status === 'active').length
)

const adminCount = computed(() =>
  users.value.filter((user: User) => user.role === 'admin').length
)

async function testAPI () {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('/api/users')
    if (!response.ok) { throw new Error('Failed to fetch') }
    users.value = await response.json()
    console.log('✅ Users loaded:', users.value.length)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

async function testCreate () {
  const newUser = {
    name: 'Test User',
    email: 'test@example.com',
    role: 'viewer' as const,
    status: 'active' as const
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) { throw new Error('Failed to create') }

    const created = await response.json()
    console.log('✅ User created:', created)
    await testAPI()
  } catch (e) {
    console.error('Create failed:', e)
  }
}

async function testDelete () {
  if (!users.value.length) {
    console.log('No users to delete')
    return
  }

  const firstUser = users.value[0]
  if (!firstUser) { return }

  try {
    const response = await fetch(`/api/users/${firstUser.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) { throw new Error('Failed to delete') }

    console.log('✅ User deleted:', firstUser.id)
    await testAPI()
  } catch (e) {
    console.error('Delete failed:', e)
  }
}

onMounted(() => {
  testAPI()
})
</script>