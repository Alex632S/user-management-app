<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Навигация -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Логотип/Название -->
          <NuxtLink 
            to="/" 
            class="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            User Management
          </NuxtLink>
          
          <!-- Навигационные ссылки -->
          <div class="flex items-center space-x-4">
            <NuxtLink 
              to="/" 
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="[
                $route.path === '/' 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              Users
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Основной контент -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NuxtPage />
    </main>

    <!-- Контейнер для уведомлений -->
    <div id="notifications" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  if (import.meta.dev) {
    console.log('🚀 App mounted, MSW should be running')
  }
})

</script>
