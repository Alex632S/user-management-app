<template>
  <div class="mb-8">
    <Text tag="h1" size="xl" weight="semibold" color="gray-800">
      <slot>Project</slot>
    </Text>
  </div>
</template>

<script setup>
  import Text from '../../atoms/Text.vue'
</script>
