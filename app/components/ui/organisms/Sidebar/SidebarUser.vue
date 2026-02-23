<template>
  <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-gray-50">
    <UserInfo :name="name" :email="email" :avatar="avatar" />
  </a>
</template>

<script setup>
  import UserInfo from '../../molecules/UserInfo.vue'

  defineProps({
    name: {
      type: String,
      default: 'Tom Cook'
    },
    email: {
      type: String,
      default: 'tom@example.com'
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/32'
    }
  })
</script>
