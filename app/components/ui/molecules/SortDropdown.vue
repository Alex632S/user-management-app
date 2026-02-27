<template>
  <el-dropdown class="relative">
    <button
      class="flex items-center gap-x-1 text-xs font-medium text-gray-600 hover:text-indigo-600 transition-colors"
    >
      {{ label }}
      <Icon name="chevron-down" size="4" />
    </button>
    <el-menu
      anchor="bottom end"
      popover
      class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-200 focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <a
        v-for="option in options"
        :key="option.value"
        href="#"
        class="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
        @click.prevent="handleSelect(option.value)"
      >
        {{ option.label }}
      </a>
    </el-menu>
  </el-dropdown>
</template>

<script setup lang="ts">
  import Icon from './../atoms/Icon.vue'

  // Определяем интерфейс для опции сортировки
  interface SortOption {
    value: string
    label: string
  }

  const props = defineProps({
    label: {
      type: String,
      default: 'Сортировка'
    },
    options: {
      type: Array as () => SortOption[],
      default: () => [
        { value: 'name', label: 'По имени' },
        { value: 'activity', label: 'По активности' },
        { value: 'department', label: 'По отделу' }
      ]
    }
  })

  const emit = defineEmits<{
    (e: 'select', value: string): void
  }>()

  const handleSelect = (value: string) => {
    emit('select', value)
  }
</script>
