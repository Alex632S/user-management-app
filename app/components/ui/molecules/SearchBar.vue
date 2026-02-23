<template>
  <div class="relative">
    <Icon
      name="search"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      :placeholder="placeholder"
      class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-model="searchQuery"
      @input="$emit('update:modelValue', searchQuery)"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Icon from '../atoms/Icon.vue'

  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Поиск...'
    },
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const searchQuery = ref(props.modelValue)
</script>
