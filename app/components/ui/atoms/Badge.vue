<template>
  <span
    class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
    :class="variantClass"
  >
    <slot />
  </span>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    variant: {
      type: String,
      default: 'default',
      validator: (value) =>
        ['default', 'success', 'warning', 'danger'].includes(value)
    }
  })

  const variantClass = computed(() => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800'
    }
    return variants[props.variant]
  })
</script>
