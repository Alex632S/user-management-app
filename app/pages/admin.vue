<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Админ панель -->
    <div class="flex h-screen">
      <!-- Админ сайдбар -->
      <div class="w-64 bg-gray-900 text-white flex flex-col">
        <div class="p-6">
          <h1 class="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav class="flex-1 px-4">
          <NuxtLink
            to="/admin"
            class="block px-4 py-2 rounded-lg mb-1 hover:bg-gray-800 transition-colors"
            :class="{ 'bg-gray-800': $route.path === '/admin' }"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            to="/admin/users"
            class="block px-4 py-2 rounded-lg mb-1 hover:bg-gray-800 transition-colors"
            :class="{ 'bg-gray-800': $route.path === '/admin/users' }"
          >
            Users
          </NuxtLink>
          <NuxtLink
            to="/admin/settings"
            class="block px-4 py-2 rounded-lg mb-1 hover:bg-gray-800 transition-colors"
            :class="{ 'bg-gray-800': $route.path === '/admin/settings' }"
          >
            Settings
          </NuxtLink>
        </nav>

        <!-- Выход -->
        <div class="p-4 border-t border-gray-800">
          <button
            @click="logout"
            class="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Выйти
          </button>
        </div>
      </div>

      <!-- Основной контент -->
      <div class="flex-1 overflow-auto">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function logout() {
    // Здесь логика выхода
    router.push('/')
  }
</script>
