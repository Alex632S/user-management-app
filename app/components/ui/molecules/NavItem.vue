<template>
  <a
    :href="to"
    class="flex items-center px-3 py-2 text-sm font-medium rounded-lg"
    :class="[
      active ? 'bg-gray-100 text-gray-700' : 'text-gray-600 hover:bg-gray-50'
    ]"
  >
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
  import Icon from '../atoms/Icon.vue'
  import Text from '../atoms/Text.vue'

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
