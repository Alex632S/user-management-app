<template>
  <img class="w-8 h-8 rounded-full object-cover" :src="src" :alt="alt" />
</template>

<script setup>
  defineProps({
    src: {
      type: String,
      default: 'https://via.placeholder.com/32'
    },
    alt: {
      type: String,
      default: 'Avatar'
    }
  })
</script>
