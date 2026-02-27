<template>
  <NavItem :to="to" :icon="icon" :active="active">
    <slot />
  </NavItem>
</template>

<script setup>
  import NavItem from '../../molecules/NavItem.vue'

  defineProps({
    to: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  })
</script>
