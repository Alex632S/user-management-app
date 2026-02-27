<template>
  <div
    class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg"
  >
    <!-- Шапка карточки с градиентом -->
    <div class="h-32 bg-gradient-to-r from-indigo-500 to-indigo-600 relative">
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
        <Badge :variant="user.status === 'Active' ? 'success' : 'default'">
          {{ user.status }}
        </Badge>
      </div>

      <div class="mt-6 border-t border-gray-200 pt-6">
        <h3 class="text-sm font-medium text-gray-500">Контактная информация</h3>
        <dl class="mt-3 space-y-3">
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Email</dt>
            <dd class="text-sm text-gray-900">{{ user.email }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Телефон</dt>
            <dd class="text-sm text-gray-900">{{ user.phone }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Отдел</dt>
            <dd class="text-sm text-gray-900">{{ user.department }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-sm text-gray-500">Локация</dt>
            <dd class="text-sm text-gray-900">{{ user.location }}</dd>
          </div>
        </dl>
      </div>

      <div class="mt-6 border-t border-gray-200 pt-6">
        <h3 class="text-sm font-medium text-gray-500">Статистика</h3>
        <div class="mt-3 grid grid-cols-2 gap-4">
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="text-xs text-gray-500">Проектов</p>
            <p class="text-xl font-semibold text-gray-900">
              {{ user.projects }}
            </p>
          </div>
          <div class="bg-gray-100 rounded-lg p-3">
            <p class="text-xs text-gray-500">Коммитов</p>
            <p class="text-xl font-semibold text-gray-900">
              {{ user.commits }}
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

  defineProps({
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: 'Michael Foster',
        role: 'Lead Developer',
        email: 'michael.foster@example.com',
        phone: '+1 (555) 123-4567',
        department: 'Engineering',
        location: 'San Francisco, CA',
        projects: '24',
        commits: '1,432',
        status: 'Active',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      })
    }
  })

  defineEmits(['message', 'profile'])
</script>
