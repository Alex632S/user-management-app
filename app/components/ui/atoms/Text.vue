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

  const sizeClass = computed(() => `typography-size-${props.size}`)
  const weightClass = computed(() => `typography-weight-${props.weight}`)
  const colorClass = computed(() => `typography-color-${props.color}`)
</script>

<style scoped lang="scss">
  $typography-sizes: (
    xs: 0.75rem,
    sm: 0.875rem,
    base: 1rem,
    lg: 1.125rem,
    xl: 1.25rem,
    2xl: 1.5rem
  );

  $typography-weights: (
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  );

  $typography-colors: (
    gray-300: #d1d5db,
    gray-400: #9ca3af,
    gray-500: #6b7280,
    gray-600: #4b5563,
    gray-700: #374151,
    gray-800: #1f2937,
    gray-900: #111827,
    blue-500: #3b82f6,
    blue-600: #2563eb,
    red-500: #ef4444,
    red-600: #dc2626,
    green-500: #10b981,
    green-600: #059669,
    yellow-500: #eab308,
    indigo-500: #6366f1,
    indigo-600: #4f46e5
  );

  @each $size, $value in $typography-sizes {
    .typography-size-#{$size} {
      font-size: $value;
      line-height: 1.5;
    }
  }

  @each $weight, $value in $typography-weights {
    .typography-weight-#{$weight} {
      font-weight: $value;
    }
  }

  @each $color, $value in $typography-colors {
    .typography-color-#{$color} {
      color: $value;
    }
  }
</style>
