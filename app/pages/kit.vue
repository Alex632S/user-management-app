<template>
  <div>
    <div class="m-3">
      <h1>Atoms</h1>

      <div class="m-3">
        <Avatar />
      </div>
      <div class="m-3 flex space-x-2">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="default">Default</Badge>
      </div>
      <div class="m-3 flex space-x-2">
        <Icon name="plus" color="blue-600" size="4" />
        <Icon name="dashboard" color="blue-600" size="5" />
        <Icon name="team" color="blue-600" size="6" />
        <Icon name="projects" color="blue-600" size="8" />
        <Icon name="calendar" color="blue-600" size="10" />
        <Icon name="documents" color="blue-600" size="12" />
        <Icon name="settings" color="blue-600" size="12" />
        <Icon name="chevron-down" color="blue-600" size="4" />
        <Icon name="chevron-up" color="blue-600" size="5" />
        <Icon name="search" color="blue-600" size="6" />
        <Icon name="menu" color="blue-600" size="8" />
        <Icon name="check" color="blue-600" size="10" />
        <Icon name="sort-asc" color="blue-600" size="12" />
        <Icon name="sort-desc" color="blue-600" size="12" />
        <Icon name="sort-desc" color="blue-600" size="5" />
        <Icon name="arrow-up" color="blue-600" size="6" />
        <Icon name="arrow-down" color="blue-600" size="8" />
      </div>
      <div class="m-3">
        <SearchInput />
      </div>

      <div class="m-3">
        <Text tag="p" size="sm" :weight="'normal'" :color="'gray-600'"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem at
          ratione aliquam eveniet praesentium voluptatem nam error rem tenetur?
          Doloribus veniam dolore labore consectetur at facere inventore porro
          ipsam consequatur?</Text
        >
      </div>
    </div>
    <div class="m-3">
      <h1>Molecules</h1>
      <div class="m-3">
        <NavItem
          style="width: 200px; margin-bottom: 10px"
          :to="'/'"
          :icon="'team'"
          :active="true"
        >
          Нажать для перехода
        </NavItem>
        <NavItem style="width: 400px" :to="'/'" :icon="'menu'" :active="true">
          Нажать для перехода
        </NavItem>
      </div>
      <div>
        <NotificationToast
          v-if="notification.show"
          :type="notification.type"
          :message="notification.message"
          :errors="notification.errors"
          @close="notification.show = false"
        />

        <Button
          style="margin-right: 8px"
          variant="success"
          @click="useNotificationToast('success')"
          >Success</Button
        >
        <Button
          variant="danger"
          size="sm"
          @click="useNotificationToast('error')"
          >Error</Button
        >
      </div>
      <div class="mt-3">
        <!-- TODO -->
        <!-- Удалить компонент. Сравнить с SearchInput.vue -->
        <SearchBar />
      </div>

      <div style="height: 300px; border: thick solid #32a1ce; margin-top: 12px">
        <Sidebar>
          <template #logo>
            <div>Logo</div>
          </template>

          <template #nav>
            <ul>
              <li>Home</li>
              <li>About</li>
            </ul>
          </template>

          <template #user>
            <div>User: John</div>
          </template>
        </Sidebar>
      </div>

      <div style="height: 30px; border: thick solid #32a1ce; margin-top: 12px">
        <SidebarDivider />
      </div>

      <div>
        <SidebarLogo />
      </div>
    </div>

    <div>
      <SidebarNav />
    </div>

    <div style="border: thick solid #32a1ce; margin-top: 12px">
      <PageHeader title="Настройки" current-page="Профиль" />
    </div>

    <div style="border: thick solid #32a1ce; margin-top: 12px">
      <UserCard :user="user" @save="handleSave" @delete="handleDelete" />
    </div>

    <div style="border: thick solid #32a1ce; margin-top: 12px">
      <UserFormModal
        v-if="showModal"
        mode="create"
        @close="showModal = false"
        @save="handleSave2"
      />

      <Button style="margin: 8px" variant="primary" @click="openModal2"
        >Создать пользователя</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { UserFormData, UserRole, UserStatus } from '~/types/user'
  import Avatar from '~/components/ui/atoms/Avatar.vue'
  import Badge from '~/components/ui/atoms/Badge.vue'
  import Icon from '~/components/ui/atoms/Icon.vue'
  import SearchInput from '~/components/ui/molecules/SearchInput.vue'
  import Text from '~/components/ui/atoms/Text.vue'
  import NavItem from '~/components/ui/molecules/NavItem.vue'
  import NotificationToast from '~/components/ui/molecules/NotificationToast.vue'
  import Button from '~/components/ui/molecules/Button.vue'
  import SearchBar from '~/components/ui/molecules/SearchBar.vue'
  import Sidebar from '~/components/ui/organisms/Sidebar/Sidebar.vue'
  import SidebarDivider from '~/components/ui/organisms/Sidebar/SidebarDivider.vue'
  import SidebarLogo from '~/components/ui/organisms/Sidebar/SidebarLogo.vue'
  import SidebarNav from '~/components/ui/organisms/Sidebar/SidebarNav.vue'
  import PageHeader from '~/components/ui/organisms/PageHeader.vue'
  import UserCard from '~/components/ui/organisms/UserCard.vue'
  import UserFormModal from '~/components/ui/organisms/UserFormModal.vue'

  // --- NotificationToast
  interface Notification {
    show: boolean
    type: 'success' | 'error'
    message: string
    errors: Record<string, string> | null
  }

  const notification = ref<Notification>({
    show: false,
    type: 'success',
    message: '',
    errors: null
  })

  const useNotificationToast = (type: string) => {
    notification.value.show = true

    switch (type) {
      case 'success':
        notification.value.type = type
        notification.value.message =
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        break

      case 'error':
        notification.value.type = type
        notification.value.message =
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        break
    }
  }
  // NotificationToast ---

  const searchQuery = ref('')

  const handleSearch = (query: any) => {
    searchQuery.value = query
  }

  // --- UserCard
  const user = ref<
    UserFormData & {
      id: string
      avatar: string
      registeredAt: string
      lastLogin: string
    }
  >({
    id: '1',
    name: 'Алексей Иванов',
    email: 'alexey@example.com',
    phone: '+7 (999) 123-45-67',
    role: 'admin' as UserRole,
    status: 'active' as UserStatus,
    department: 'IT',
    location: 'Москва',
    avatar: 'https://via.placeholder.com/96',
    registeredAt: '2023-01-15',
    lastLogin: '2024-12-01'
  })

  const handleSave = (id: string, data: Partial<UserFormData>) => {
    console.log('Сохранено:', id, data)
    alert('Данные сохранены!')
  }

  const handleDelete = (user: any) => {
    console.log('Удалить:', user)
    if (confirm('Удалить пользователя?')) {
      alert('Пользователь удален')
    }
  }
  // UserCard ---

  // --- UserModal
  const showModal = ref(false)

  const openModal2 = () => {
    showModal.value = true
  }

  const handleSave2 = (userData: any) => {
    console.log('Создан пользователь:', userData)
    showModal.value = false
    alert('Пользователь создан!')
  }
  // UserModal ---
</script>
