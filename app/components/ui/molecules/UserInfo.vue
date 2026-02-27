<template>
  <div class="flex items-center">
    <Avatar :src="avatar" :alt="name" class="mr-3" />
    <div>
      <Text size="sm" weight="medium" color="gray-700">{{ name }}</Text>
      <Text size="xs" color="gray-500">{{ email }}</Text>
    </div>
  </div>
</template>

<script setup>
  import Avatar from '../atoms/Avatar.vue'
  import Text from '../atoms/Text.vue'

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
