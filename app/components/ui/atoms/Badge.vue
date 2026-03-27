<template>
  <span class="badge" :class="variantClass">
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

  const variantClass = computed(() => `badge--${props.variant}`)
</script>

<style lang="scss" scoped>
  $badge-default-bg: #f3f4f6;
  $badge-default-text: #1f2937;

  $badge-success-bg: #dcfce7;
  $badge-success-text: #166534;

  $badge-warning-bg: #fef9c3;
  $badge-warning-text: #854d0e;

  $badge-danger-bg: #fee2e2;
  $badge-danger-text: #991b1b;

  .badge {
    padding: 0.22rem 0.6rem;
    font-size: 0.79rem;
    border-radius: 50px;

    &--default {
      background-color: $badge-default-bg;
      color: $badge-default-text;
    }

    &--success {
      background-color: $badge-success-bg;
      color: $badge-success-text;
    }

    &--warning {
      background-color: $badge-warning-bg;
      color: $badge-warning-text;
    }

    &--danger {
      background-color: $badge-danger-bg;
      color: $badge-danger-text;
    }
  }
</style>
