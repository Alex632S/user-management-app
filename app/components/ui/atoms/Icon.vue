<template>
  <svg
    class="icon"
    :class="[colorClass, sizeClass]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    v-html="path"
  />
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'gray-400'
    },
    size: {
      type: String,
      default: '5'
    }
  })

  const paths = {
    dashboard:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />',
    team: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />',
    projects:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
    calendar:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />',
    documents:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />',
    settings:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />',
    x: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />',
    'chevron-down':
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />',
    'chevron-up':
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />',
    search:
      '<path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />',
    menu: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />',
    check:
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />',
    plus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />',
    'sort-asc':
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9M3 12h5M13 12l4-4 4 4M13 16h9M13 20h5" />',
    'sort-desc':
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9M3 12h5M13 16l4 4 4-4M13 20h9M13 8h5" />',
    'arrow-up':
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7M12 3v18" />',
    'arrow-down':
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14l7 7 7-7M12 21V3" />'
  }

  const path = computed(() => paths[props.name] || '')

  const colorClass = computed(() => `icon-color-${props.color}`)
  const sizeClass = computed(() => `icon-size-${props.size}`)
</script>

<style lang="scss" scoped>
  .icon {
    fill: none;
    stroke: currentColor;

    $sizes: (
      '4': 1rem,
      '5': 1.25rem,
      '6': 1.5rem,
      '8': 2rem,
      '10': 2.5rem,
      '12': 3rem
    );

    @each $size, $value in $sizes {
      &.icon-size-#{$size} {
        width: $value;
        height: $value;
      }
    }

    $colors: (
      'gray-400': #9ca3af,
      'gray-500': #6b7280,
      'gray-600': #4b5563,
      'blue-500': #3b82f6,
      'blue-600': #2563eb,
      'red-500': #ef4444,
      'red-600': #dc2626,
      'green-500': #10b981,
      'green-600': #059669,
      'yellow-500': #eab308,
      'white': #ffffff,
      'black': #000000
    );

    @each $color, $value in $colors {
      &.icon-color-#{$color} {
        color: $value;
      }
    }
  }
</style>
