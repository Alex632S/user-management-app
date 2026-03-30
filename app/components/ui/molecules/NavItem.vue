<template>
  <a :href="to" class="nav-link" :class="{ 'nav-link--active': active }">
    <Icon
      v-if="icon"
      :name="icon"
      :color="active ? 'gray-500' : 'gray-400'"
      class="mr-3"
    />
    <Text
      size="sm"
      :weight="active ? 'medium' : 'normal'"
      :color="active ? 'gray-700' : 'gray-600'"
    >
      <slot />
    </Text>
  </a>
</template>

<script setup>
  import Icon from '~/components/ui/atoms/Icon.vue'
  import Text from '~/components/ui/atoms/Text.vue'

  defineProps({
    to: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped lang="scss">
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.5rem;
    color: #4b5563;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
      background-color: #f9fafb;
    }

    &--active {
      background-color: #f3f4f6;
      color: #374151;
    }
  }
</style>
