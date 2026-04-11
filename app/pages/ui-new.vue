<template>
  <Table :title="title" :dynamic-data="data">
    <template #column-name="{ tableData }">
      {{ tableData.name }}
      <Badge>2FA</Badge>
    </template>

    <template #column-firstName="{ tableData }">
      {{ tableData.firstName }}
    </template>
    <template #column-lastName="{ tableData }">
      {{ tableData.lastName }}
    </template>
    <template #column-email="{ tableData }">
      {{ tableData.email }}
    </template>
    <template #column-group="{ tableData }">
      {{ tableData.group }}
    </template>
    <template #column-lastLogin="{ tableData }">
      {{ tableData.lastLogin }}
    </template>
  </Table>
</template>

<script setup>
  import Table from '~/ui-new/TheTable.vue'
  import Badge from '~/ui-new/TheBadge.vue'

  const title = reactive([
    'Name',
    'First Name',
    'Last Name',
    'Email',
    'Group',
    'Last Login'
  ])

  const data = reactive([
    {
      name: 'dave',
      firstName: 'Dave',
      lastName: 'Smith',
      email: 'dave@example.com',
      group: 'Administrator',
      lastLogin: '15.03.2025'
    },
    {
      name: 'john',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      group: 'User',
      lastLogin: '15.03.2025'
    },
    {
      name: 'john',
      firstName: 'John',
      lastName: 'Doe',
      email: '',
      group: 'User',
      lastLogin: '--'
    }
  ])
</script>
