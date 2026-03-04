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
          {{ STATUS_LABELS[user.status] }}
        </Badge>
      </div>
      <div class="mt-1 flex items-center gap-x-2 text-xs text-gray-500">
        <p class="truncate">{{ ROLE_LABELS[user.role] }}</p>
        <span>•</span>
        <p>{{ formatPhone(user.phone) }}</p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
  import Badge from '../atoms/Badge.vue'
  import type { User } from '~/types/user'
  import { ROLE_LABELS, STATUS_LABELS, formatPhone } from '~/types/user'

  defineProps<{
    user: User
    active?: boolean
  }>()

  defineEmits<{
    (e: 'click', user: User): void
  }>()
</script>
