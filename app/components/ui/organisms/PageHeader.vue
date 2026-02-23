<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
    <div class="px-6 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-800">
          <slot name="title">{{ title }}</slot>
        </h1>

        <div v-if="showSearch" class="w-64">
          <slot name="search">
            <SearchBar
              v-model="searchValue"
              :placeholder="searchPlaceholder"
              @search="$emit('search', $event)"
            />
          </slot>
        </div>
      </div>

      <div v-if="showBreadcrumbs" class="mt-2 text-sm text-gray-600">
        <slot name="breadcrumbs">
          <span>Главная</span>
          <span v-if="currentPage" class="mx-2">/</span>
          <span v-if="currentPage" class="font-medium text-gray-900">
            {{ currentPage }}
          </span>
        </slot>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SearchBar from '../molecules/SearchBar.vue'

  defineProps({
    title: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      default: 'Поиск...'
    },
    showBreadcrumbs: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['search', 'update:searchValue'])

  const searchValue = ref('')
</script>
