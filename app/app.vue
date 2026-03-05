<script setup lang="ts">
  import { ref } from 'vue'

  const layout = ref()
</script>

<template>
  <NuxtLayout ref="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
