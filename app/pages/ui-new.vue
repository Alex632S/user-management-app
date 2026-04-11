<template>
  <Table :title="title" :dynamic-data="data" :field-mapping="fieldMapping">
    <!-- Колонка Name -->
    <template #column-Name="{ tableData }">
      <div class="user-info">
        <span class="user-name">{{ tableData.name }}</span>
        <Badge v-if="tableData.is2FAEnabled" type="success" size="small">
          2FA
        </Badge>
      </div>
    </template>

    <!-- Колонка First Name -->
    <template #column-FirstName="{ tableData }">
      <span>{{ tableData.firstName }}</span>
    </template>

    <!-- Колонка Last Name -->
    <template #column-LastName="{ tableData }">
      <span>{{ tableData.lastName }}</span>
    </template>

    <!-- Колонка Email -->
    <template #column-Email="{ tableData }">
      <div class="email-cell">
        <span>{{ tableData.email || '—' }}</span>
        <Badge v-if="!tableData.email" type="warning" size="small">
          No email
        </Badge>
      </div>
    </template>

    <!-- Колонка Group -->
    <template #column-Group="{ tableData }">
      <Badge :type="getGroupType(tableData.group)">
        {{ tableData.group }}
      </Badge>
    </template>

    <!-- Колонка Status -->
    <template #column-Status="{ tableData }">
      <Badge :type="getStatusType(tableData.status)">
        {{ getStatusText(tableData.status) }}
      </Badge>
    </template>

    <!-- Колонка Last Login -->
    <template #column-LastLogin="{ tableData }">
      <div class="last-login">
        <span>{{ tableData.lastLoginFormatted }}</span>
        <span
          v-if="tableData.lastLoginFormatted === 'Never'"
          class="never-login"
        >
          ⚠️
        </span>
      </div>
    </template>

    <!-- Колонка Role (если добавите) -->
    <template #column-Role="{ tableData }">
      <span class="role">{{ tableData.role }}</span>
    </template>

    <!-- Колонка Department (если добавите) -->
    <template #column-Department="{ tableData }">
      <span>{{ tableData.department }}</span>
    </template>

    <!-- Колонка Location (если добавите) -->
    <template #column-Location="{ tableData }">
      <span>{{ tableData.location }}</span>
    </template>

    <!-- Колонка 2FA (если добавите) -->
    <template #column-2FA="{ tableData }">
      <Badge
        :type="tableData.is2FAEnabled ? 'success' : 'warning'"
        size="small"
      >
        {{ tableData.is2FAEnabled ? 'ON' : 'OFF' }}
      </Badge>
    </template>

    <!-- Колонка Projects (если добавите) -->
    <template #column-Projects="{ tableData }">
      <span class="projects-count">{{ tableData.projectsCount || 0 }}</span>
    </template>
  </Table>
</template>

<script setup>
  import { reactive } from 'vue'
  import Table from '~/ui-new/TheTable.vue'
  import Badge from '~/ui-new/TheBadge.vue'

  // Заголовки таблицы
  const title = reactive([
    'Name',
    'First Name',
    'Last Name',
    'Email',
    'Group',
    'Status',
    'Last Login'
  ])

  // Маппинг заголовков на поля данных
  const fieldMapping = {
    Name: 'name',
    'First Name': 'firstName',
    'Last Name': 'lastName',
    Email: 'email',
    Group: 'group',
    Status: 'status',
    'Last Login': 'lastLoginFormatted'
  }

  // Данные пользователей
  const data = reactive([
    {
      id: 1,
      name: 'Alex',
      firstName: 'Alex',
      lastName: 'Smith',
      email: 'alex.smith@company.com',
      group: 'Administrator',
      status: 'active',
      lastLoginFormatted: '15.03.2025 09:23',
      is2FAEnabled: true,
      role: 'admin',
      department: 'IT',
      location: 'New York',
      projectsCount: 12
    },
    {
      id: 2,
      name: 'Maria',
      firstName: 'Maria',
      lastName: 'Johnson',
      email: 'maria.johnson@company.com',
      group: 'Manager',
      status: 'active',
      lastLoginFormatted: '15.03.2025 08:15',
      is2FAEnabled: false,
      role: 'manager',
      department: 'Sales',
      location: 'Los Angeles',
      projectsCount: 8
    },
    {
      id: 3,
      name: 'David',
      firstName: 'David',
      lastName: 'Williams',
      email: 'david.williams@company.com',
      group: 'User',
      status: 'active',
      lastLoginFormatted: '14.03.2025 17:45',
      is2FAEnabled: false,
      role: 'user',
      department: 'Marketing',
      location: 'Chicago',
      projectsCount: 5
    },
    {
      id: 4,
      name: 'Lisa',
      firstName: 'Lisa',
      lastName: 'Brown',
      email: 'lisa.brown@company.com',
      group: 'User',
      status: 'inactive',
      lastLoginFormatted: '14.03.2025 11:20',
      is2FAEnabled: false,
      role: 'user',
      department: 'HR',
      location: 'Houston',
      projectsCount: 3
    },
    {
      id: 5,
      name: 'Michael',
      firstName: 'Michael',
      lastName: 'Jones',
      email: 'michael.jones@company.com',
      group: 'User',
      status: 'active',
      lastLoginFormatted: '13.03.2025 14:30',
      is2FAEnabled: true,
      role: 'user',
      department: 'IT',
      location: 'Phoenix',
      projectsCount: 6
    },
    {
      id: 6,
      name: 'Sophia',
      firstName: 'Sophia',
      lastName: 'Garcia',
      email: 'sophia.garcia@company.com',
      group: 'Manager',
      status: 'active',
      lastLoginFormatted: '13.03.2025 09:50',
      is2FAEnabled: true,
      role: 'manager',
      department: 'Sales',
      location: 'Philadelphia',
      projectsCount: 10
    },
    {
      id: 7,
      name: 'Emma',
      firstName: 'Emma',
      lastName: 'Martinez',
      email: '',
      group: 'User',
      status: 'pending',
      lastLoginFormatted: 'Never',
      is2FAEnabled: false,
      role: 'user',
      department: 'Marketing',
      location: 'San Antonio',
      projectsCount: 0
    },
    {
      id: 8,
      name: 'James',
      firstName: 'James',
      lastName: 'Rodriguez',
      email: 'james.rodriguez@company.com',
      group: 'User',
      status: 'active',
      lastLoginFormatted: '12.03.2025 16:40',
      is2FAEnabled: true,
      role: 'user',
      department: 'IT',
      location: 'San Diego',
      projectsCount: 7
    },
    {
      id: 9,
      name: 'Anna',
      firstName: 'Anna',
      lastName: 'Wilson',
      email: 'anna.wilson@company.com',
      group: 'Administrator',
      status: 'active',
      lastLoginFormatted: '12.03.2025 10:15',
      is2FAEnabled: true,
      role: 'admin',
      department: 'IT',
      location: 'Dallas',
      projectsCount: 15
    },
    {
      id: 10,
      name: 'Robert',
      firstName: 'Robert',
      lastName: 'Anderson',
      email: 'robert.anderson@company.com',
      group: 'User',
      status: 'inactive',
      lastLoginFormatted: '11.03.2025 13:25',
      is2FAEnabled: false,
      role: 'user',
      department: 'Finance',
      location: 'San Jose',
      projectsCount: 4
    }
  ])

  // Вспомогательные функции для Badge
  const getGroupType = (group) => {
    switch (group) {
      case 'Administrator':
        return 'error'
      case 'Manager':
        return 'info'
      case 'User':
        return 'success'
      default:
        return 'warning'
    }
  }

  const getStatusType = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'error'
      case 'pending':
        return 'warning'
      default:
        return 'info'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Активен'
      case 'inactive':
        return 'Неактивен'
      case 'pending':
        return 'Ожидает'
      default:
        return status
    }
  }
</script>

<style scoped lang="scss">
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;

    .user-name {
      font-weight: 500;
    }
  }

  .email-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .last-login {
    display: flex;
    align-items: center;
    gap: 6px;

    .never-login {
      font-size: 14px;
      opacity: 0.7;
    }
  }

  .role {
    text-transform: capitalize;
    font-size: 13px;
    padding: 2px 8px;
    background: #f0f0f0;
    border-radius: 4px;
    display: inline-block;
  }

  .projects-count {
    font-weight: 600;
    color: #2c3e50;
  }
</style>
