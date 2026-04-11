<template>
  <span class="badge" :class="`badge-${type}`"><slot /></span>
</template>

<script setup lang="ts">
  defineProps({
    type: {
      type: String,
      default: 'success'
    }
  })
</script>

<style scoped lang="scss">
  @use './styles.scss' as *;

  .badge {
    color: white;
    font-size: $badge-font-size;
    font-weight: 400;
    padding: $badge-padding-y $badge-padding-x;
    border-radius: $badge-border-radius;
    max-width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.badge-success {
      background: $color-success;
    }
    &.badge-warning {
      background: $color-warning;
    }
    &.badge-error {
      background: $color-error;
    }
    &.badge-info {
      background: $color-info;
    }
  }
</style>
