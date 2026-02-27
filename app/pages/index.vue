<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Сайдбар и основной контент в flex -->
    <div class="flex h-screen">
      <!-- Десктопный сайдбар (скрыт на мобильных) -->
      <Sidebar class="hidden lg:flex">
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
            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </template>
      </Sidebar>

      <!-- Мобильный сайдбар -->
      <MobileSidebar
        ref="mobileSidebar"
        id="sidebar-mobile"
        @close="closeMobileSidebar"
      >
        <template #logo>
          <img
            class="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
        </template>

        <template #nav-items>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/')"
            >
              <Icon
                name="dashboard"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/users')"
            >
              <Icon
                name="team"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Users
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/projects')"
            >
              <Icon
                name="projects"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Projects
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/calendar')"
            >
              <Icon
                name="calendar"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Calendar
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/documents')"
            >
              <Icon
                name="documents"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Documents
            </a>
          </li>
          <li>
            <a
              href="#"
              class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              @click.prevent="navigateTo('/settings')"
            >
              <Icon
                name="settings"
                class="text-gray-500 group-hover:text-gray-900"
              />
              Settings
            </a>
          </li>
        </template>

        <template #user>
          <a
            href="#"
            class="flex -mx-6 items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
          >
            <img
              class="h-8 w-8 rounded-full bg-gray-300"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span class="sr-only">Your profile</span>
            <span aria-hidden="true">Tom Cook</span>
          </a>
        </template>
      </MobileSidebar>

      <!-- Основной контент -->
      <main class="flex-1 overflow-auto lg:pl-0">
        <!-- Хедер с заголовком (стилизованный под asdf.html) -->
        <div
          class="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8"
        >
          <!-- Кнопка мобильного меню -->
          <button
            @click="openMobileSidebar"
            class="lg:hidden mb-4 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Открыть меню</span>
            <Icon name="menu" size="6" />
          </button>

          <!-- Заголовок раздела -->
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            {{ pageTitle }}
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            {{ pageDescription }}
          </p>

          <!-- Хлебные крошки (под описанием) -->
          <nav
            class="mt-3 flex items-center gap-2 text-sm border-t border-gray-100 pt-3"
            aria-label="Breadcrumb"
          >
            <a
              href="#"
              class="font-mono text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors"
              @click.prevent="navigateTo('/')"
            >
              Dashboard
            </a>
            <Icon name="chevron-right" size="4" class="text-gray-400" />
            <a
              href="#"
              class="font-mono text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors"
              @click.prevent="navigateTo('/users')"
            >
              Team
            </a>
            <Icon name="chevron-right" size="4" class="text-gray-400" />
            <span
              class="font-mono text-xs font-medium uppercase tracking-wider text-indigo-600"
            >
              Team Members
            </span>
          </nav>
        </div>

        <!-- Основная область: поиск + список пользователей + карточка -->
        <div class="flex flex-col lg:flex-row">
          <!-- Левая часть: Поиск + Список пользователей -->
          <div class="w-full lg:w-1/3 border-r border-gray-200">
            <!-- Поиск -->
            <div
              class="sticky top-[132px] lg:top-[152px] z-30 bg-gray-50 px-4 py-3 sm:px-6 lg:px-8 border-b border-gray-200"
            >
              <SearchInput
                v-model="searchQuery"
                placeholder="Поиск участников..."
                @search="handleSearch"
              />
            </div>

            <!-- Сортировка и счетчик -->
            <div
              class="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 border-b border-gray-200 bg-white"
            >
              <span class="text-xs font-medium text-gray-500"
                >{{ filteredUsers.length }} участников</span
              >

              <SortDropdown @select="handleSort" />
            </div>

            <!-- Список пользователей -->
            <ul
              role="list"
              class="divide-y divide-gray-200 bg-white"
              id="users-list"
            >
              <UserListItem
                v-for="user in filteredUsers"
                :key="user.id"
                :user="user"
                :active="selectedUser?.id === user.id"
                @click="selectUser"
              />
            </ul>
          </div>

          <!-- Правая часть: Карточка пользователя -->
          <div
            class="w-full lg:w-2/3 bg-gray-50 p-4 lg:p-6 custom-scroll overflow-y-auto"
            :style="{ maxHeight: isMobile ? 'auto' : 'calc(100vh - 180px)' }"
            id="user-card-container"
          >
            <UserCard
              v-if="selectedUser"
              :user="selectedUser"
              @message="handleMessage"
              @profile="handleProfile"
            />
            <div
              v-else
              class="flex items-center justify-center h-64 text-gray-400"
            >
              Выберите пользователя из списка
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Контейнер для уведомлений -->
    <div id="notifications" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  // Существующие компоненты
  import Sidebar from '~/components/ui/organisms/Sidebar/Sidebar.vue'
  import SidebarNavGroup from '~/components/ui/organisms/Sidebar/SidebarNavGroup.vue'
  import SidebarNavItem from '~/components/ui/organisms/Sidebar/SidebarNavItem.vue'
  import SidebarUser from '~/components/ui/organisms/Sidebar/SidebarUser.vue'

  // Новые компоненты из asdf.html
  import MobileSidebar from '~/components/ui/organisms/MobileSidebar.vue'
  import UserCard from '~/components/ui/organisms/UserCard.vue'
  import SearchInput from '~/components/ui/atoms/SearchInput.vue'
  import SortDropdown from '~/components/ui/molecules/SortDropdown.vue'
  import UserListItem from '~/components/ui/molecules/UserListItem.vue'
  import Icon from '~/components/ui/atoms/Icon.vue'

  const route = useRoute()
  const router = useRouter()
  const searchQuery = ref('')
  const sortBy = ref('name')
  const selectedUser = ref<any>(null)
  const mobileSidebar = ref<InstanceType<typeof MobileSidebar> | null>(null)

  // Данные пользователей (из asdf.html)
  const users = ref([
    {
      id: 'michael',
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
    },
    {
      id: 'lindsay',
      name: 'Lindsay Walton',
      role: 'Frontend Developer',
      email: 'lindsay.walton@example.com',
      phone: '+1 (555) 234-5678',
      department: 'Product',
      location: 'New York, NY',
      projects: '18',
      commits: '967',
      status: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'courtney',
      name: 'Courtney Henry',
      role: 'Backend Developer',
      email: 'courtney.henry@example.com',
      phone: '+1 (555) 345-6789',
      department: 'Engineering',
      location: 'Austin, TX',
      projects: '31',
      commits: '2,156',
      status: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'whitney',
      name: 'Whitney Francis',
      role: 'DevOps Engineer',
      email: 'whitney.francis@example.com',
      phone: '+1 (555) 456-7890',
      department: 'Infrastructure',
      location: 'Seattle, WA',
      projects: '15',
      commits: '843',
      status: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'leonard',
      name: 'Leonard Krasner',
      role: 'Senior Designer',
      email: 'leonard.krasner@example.com',
      phone: '+1 (555) 567-8901',
      department: 'Design',
      location: 'Los Angeles, CA',
      projects: '22',
      commits: '1,234',
      status: 'Away',
      avatar:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'floyd',
      name: 'Floyd Miles',
      role: 'Product Manager',
      email: 'floyd.miles@example.com',
      phone: '+1 (555) 678-9012',
      department: 'Product',
      location: 'New York, NY',
      projects: '19',
      commits: '876',
      status: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'emily',
      name: 'Emily Selman',
      role: 'UX Researcher',
      email: 'emily.selman@example.com',
      phone: '+1 (555) 789-0123',
      department: 'Design',
      location: 'San Francisco, CA',
      projects: '14',
      commits: '654',
      status: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 'kristin',
      name: 'Kristin Watson',
      role: 'QA Engineer',
      email: 'kristin.watson@example.com',
      phone: '+1 (555) 890-1234',
      department: 'Engineering',
      location: 'Austin, TX',
      projects: '27',
      commits: '1,543',
      status: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ])

  // Вычисляемые свойства
  const pageTitle = computed((): string => {
    return 'Участники команды'
  })

  const pageDescription = computed((): string => {
    return 'Просмотр информации о членах команды и их активности'
  })

  const isMobile = computed((): boolean => {
    return window.innerWidth < 1024
  })

  const filteredUsers = computed(() => {
    let filtered = [...users.value]

    // Фильтрация по поиску
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query) ||
          user.department.toLowerCase().includes(query)
      )
    }

    // Сортировка
    filtered.sort((a, b) => {
      if (sortBy.value === 'name') {
        return a.name.localeCompare(b.name)
      }
      if (sortBy.value === 'activity') {
        return parseInt(b.projects) - parseInt(a.projects)
      }
      if (sortBy.value === 'department') {
        return a.department.localeCompare(b.department)
      }
      return 0
    })

    return filtered
  })

  // Методы
  const selectUser = (user: any) => {
    selectedUser.value = user
  }

  const handleSort = (value: string) => {
    sortBy.value = value
  }

  const handleSearch = (query: string) => {
    console.log('Searching:', query)
  }

  const handleMessage = (user: any) => {
    console.log('Message to:', user)
    // Здесь можно открыть модалку с сообщением
    alert(`Написать ${user.name}`)
  }

  const handleProfile = (user: any) => {
    console.log('View profile:', user)
    router.push(`/users/${user.id}`)
  }

  const openMobileSidebar = () => {
    mobileSidebar.value?.open()
  }

  const closeMobileSidebar = () => {
    console.log('Mobile sidebar closed')
  }

  const navigateTo = (path: string) => {
    router.push(path)
    closeMobileSidebar()
  }

  // При монтировании выбираем первого пользователя
  onMounted((): void => {
    if (users.value.length > 0) {
      selectedUser.value = users.value[0]
    }

    if (import.meta.dev) {
      console.log('🚀 Index page mounted with new components from asdf.html')
    }

    // Добавляем обработчик resize для обновления isMobile
    window.addEventListener('resize', () => {
      // Vue автоматически обновит computed свойство
    })
  })

  // Следим за изменением route для обновления выделения в мобильном меню
  watch(
    () => route.path,
    () => {
      closeMobileSidebar()
    }
  )
</script>

<style scoped>
  /* Стили для скролла из asdf.html */
  .custom-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  .custom-scroll::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  /* Медиа-запросы для мобильных устройств */
  @media (max-width: 1023px) {
    .custom-scroll {
      max-height: none !important;
      overflow-y: visible;
    }
  }
</style>
