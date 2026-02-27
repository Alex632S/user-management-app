<template>
  <component :is="tag" :class="[weightClass, colorClass, sizeClass]">
    <slot />
  </component>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    tag: {
      type: String,
      default: 'p'
    },
    size: {
      type: String,
      default: 'sm'
    },
    weight: {
      type: String,
      default: 'normal'
    },
    color: {
      type: String,
      default: 'gray-700'
    }
  })

  const sizeClass = computed(() => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl'
    }
    return sizes[props.size] || 'text-sm'
  })

  const weightClass = computed(() => {
    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    }
    return weights[props.weight] || 'font-normal'
  })

  const colorClass = computed(() => `text-${props.color}`)
</script>
