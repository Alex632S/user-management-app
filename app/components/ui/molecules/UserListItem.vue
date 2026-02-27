<template>
  <li
    class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8 hover:bg-gray-50 cursor-pointer transition-colors"
    :class="{ 'bg-indigo-50 border-l-4 border-indigo-500': active }"
    @click="$emit('click', user)"
  >
    <div class="flex-shrink-0">
      <img
        class="h-10 w-10 rounded-full ring-2 ring-gray-200"
        :src="user.avatar"
        :alt="user.name"
      />
    </div>
    <div class="min-w-0 flex-1">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
        <Badge :variant="user.status === 'active' ? 'success' : 'default'">
          {{ user.status === 'active' ? 'Активен' : 'Заблокирован' }}
        </Badge>
      </div>
      <div class="mt-1 flex items-center gap-x-2 text-xs text-gray-500">
        <p class="truncate">{{ user.role }}</p>
        <span>•</span>
        <p>{{ user.projects || '0' }} проектов</p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
  import Badge from './../atoms/Badge.vue'
  import type { ExtendedUser } from '~/types/user'

  defineProps<{
    user: ExtendedUser
    active?: boolean
  }>()

  defineEmits<{
    (e: 'click', user: ExtendedUser): void
  }>()
</script>
