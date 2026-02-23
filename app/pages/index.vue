<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Сайдбар и основной контент в flex -->
    <div class="flex h-screen">
      <!-- Сайдбар -->
      <Sidebar>
        <template #logo> User Management </template>

        <template #nav>
          <SidebarNavGroup>
            <SidebarNavItem
              to="/"
              icon="dashboard"
              :active="$route.path === '/'"
            >
              Dashboard
            </SidebarNavItem>
            <SidebarNavItem
              to="/users"
              icon="team"
              :active="$route.path.startsWith('/users')"
            >
              Users
            </SidebarNavItem>
            <SidebarNavItem
              to="/projects"
              icon="projects"
              :active="$route.path.startsWith('/projects')"
            >
              Projects
            </SidebarNavItem>
            <SidebarNavItem
              to="/calendar"
              icon="calendar"
              :active="$route.path.startsWith('/calendar')"
            >
              Calendar
            </SidebarNavItem>
            <SidebarNavItem
              to="/documents"
              icon="documents"
              :active="$route.path.startsWith('/documents')"
            >
              Documents
            </SidebarNavItem>
            <SidebarNavItem
              to="/settings"
              icon="settings"
              :active="$route.path.startsWith('/settings')"
            >
              Settings
            </SidebarNavItem>
          </SidebarNavGroup>
        </template>

        <template #user>
          <SidebarUser
            name="Tom Cook"
            email="tom@example.com"
            avatar="https://via.placeholder.com/32"
          />
        </template>
      </Sidebar>

      <!-- Основной контент -->
      <main class="flex-1 overflow-auto">
        <!-- PageHeader компонент -->
        <PageHeader
          :title="pageTitle"
          :current-page="currentPageName"
          :show-search="true"
          :show-breadcrumbs="true"
          search-placeholder="Поиск..."
          @search="handleSearch"
        />

        <!-- Контент страницы -->
        <div class="p-6">
          <NuxtPage />
        </div>
      </main>
    </div>

    <!-- Контейнер для уведомлений -->
    <div id="notifications" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  // Компоненты
  import Sidebar from '~/components/ui/organisms/Sidebar/Sidebar.vue'
  import SidebarNavGroup from '~/components/ui/organisms/Sidebar/SidebarNavGroup.vue'
  import SidebarNavItem from '~/components/ui/organisms/Sidebar/SidebarNavItem.vue'
  import SidebarUser from '~/components/ui/organisms/Sidebar/SidebarUser.vue'
  import PageHeader from '~/components/ui/organisms/PageHeader.vue'

  const route = useRoute()
  const searchQuery = ref('')

  // Вычисляем заголовок страницы на основе текущего маршрута
  const pageTitle = computed((): string => {
    const path = route.path
    if (path === '/') return 'Dashboard'
    if (path.startsWith('/users')) return 'Users'
    if (path.startsWith('/projects')) return 'Projects'
    if (path.startsWith('/calendar')) return 'Calendar'
    if (path.startsWith('/documents')) return 'Documents'
    if (path.startsWith('/settings')) return 'Settings'
    return 'User Management'
  })

  // Вычисляем название текущей страницы для хлебных крошек
  const currentPageName = computed((): string => {
    const path = route.path
    if (path === '/') return 'Dashboard'

    // Для вложенных маршрутов
    const segments = path.split('/').filter(Boolean)

    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1]
      if (lastSegment) {
        // Капитализируем первый сегмент
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
      }
    }

    return 'Главная'
  })

  // Обработчик поиска
  const handleSearch = (query: string): void => {
    console.log('Searching for:', query)
    searchQuery.value = query
    // Здесь можно добавить логику поиска
  }

  onMounted((): void => {
    if (import.meta.dev) {
      console.log('🚀 Index page mounted with sidebar layout and PageHeader')
    }
  })
</script>
