<template>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <Icon name="search" class="text-gray-400" />
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      class="w-full rounded-lg bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500 transition-all"
      @input="handleInput"
      @keyup.enter="handleEnter"
    />
  </div>
</template>

<script setup lang="ts">
  import Icon from './Icon.vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Поиск...'
    },
    type: {
      type: String,
      default: 'text'
    }
  })

  const emit = defineEmits(['update:modelValue', 'search'])

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }

  const handleEnter = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('search', target.value)
  }
</script>
