<template>
  <div
    class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg"
  >
    <!-- Шапка карточки с градиентом и кнопками действий -->
    <div class="h-32 bg-gradient-to-r from-indigo-500 to-indigo-600 relative">
      <!-- Кнопки действий в шапке -->
      <div class="absolute top-4 right-4 flex space-x-2">
        <button
          @click="$emit('edit', user)"
          class="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
          title="Редактировать"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          @click="$emit('delete', user)"
          class="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
          title="Удалить"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div class="absolute -bottom-12 left-6">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="h-24 w-24 rounded-full border-4 border-white bg-white"
        />
      </div>
    </div>

    <!-- Контент карточки -->
    <div class="pt-16 pb-6 px-6">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ user.name }}</h2>
          <p class="text-indigo-600">{{ user.role }}</p>
        </div>
        <Badge :variant="user.status === 'active' ? 'success' : 'default'">
          {{ user.status === 'active' ? 'Активен' : 'Заблокирован' }}
        </Badge>
      </div>

      <div class="mt-6 border-t border-gray-200 pt-6">
        <h3 class="text-sm font-medium text-gray-500">Контактная информация</h3>
        <dl class="mt-3 space-y-3">
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Email</dt>
            <dd class="text-sm text-gray-900">{{ user.email }}</dd>
          </div>
          <div v-if="user.phone" class="flex justify-between">
            <dt class="text-sm text-gray-500">Телефон</dt>
            <dd class="text-sm text-gray-900">{{ user.phone }}</dd>
          </div>
          <div v-if="user.department" class="flex justify-between">
            <dt class="text-sm text-gray-500">Отдел</dt>
            <dd class="text-sm text-gray-900">{{ user.department }}</dd>
          </div>
          <div v-if="user.location" class="flex justify-between">
            <dt class="text-sm text-gray-500">Локация</dt>
            <dd class="text-sm text-gray-900">{{ user.location }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Зарегистрирован</dt>
            <dd class="text-sm text-gray-900">
              {{ formatDate(user.registeredAt) }}
            </dd>
          </div>
        </dl>
      </div>

      <div class="mt-6 border-t border-gray-200 pt-6">
        <h3 class="text-sm font-medium text-gray-500">Статистика</h3>
        <div class="mt-3 grid grid-cols-2 gap-4">
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="text-xs text-gray-500">Проектов</p>
            <p class="text-xl font-semibold text-gray-900">
              {{ user.projects || '0' }}
            </p>
          </div>
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="text-xs text-gray-500">Коммитов</p>
            <p class="text-xl font-semibold text-gray-900">
              {{ user.commits || '0' }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          class="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="$emit('message', user)"
        >
          Написать
        </button>
        <button
          class="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          @click="$emit('profile', user)"
        >
          Профиль
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Badge from '../atoms/Badge.vue'
  import type { ExtendedUser } from '~/types/user'

  defineProps<{
    user: ExtendedUser
  }>()

  defineEmits<{
    (e: 'message', user: ExtendedUser): void
    (e: 'profile', user: ExtendedUser): void
    (e: 'edit', user: ExtendedUser): void
    (e: 'delete', user: ExtendedUser): void
  }>()

  function formatDate(dateString?: string): string {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('ru-RU')
  }
</script>
