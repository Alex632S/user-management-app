<template>
  <div>
    <nav class="nav">
      <div class="nav-container">
        <NuxtLink to="/" class="nav-logo">
          User Management
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/" class="nav-link" active-class="nav-link--active">
            Users
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main class="main">
      <NuxtPage />
    </main>

    <div id="notifications"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  if (import.meta.dev) {
    console.log('🚀 App mounted, MSW should be running')
  }
})

</script>
