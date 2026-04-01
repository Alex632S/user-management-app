<template>
  <el-dropdown class="sort-dropdown">
    <button class="sort-dropdown__trigger">
      {{ label }}
      <Icon name="chevron-down" size="4" />
    </button>
    <el-menu anchor="bottom end" popover class="sort-dropdown__menu">
      <a
        v-for="option in options"
        :key="option.value"
        href="#"
        class="sort-dropdown__option"
        @click.prevent="handleSelect(option.value)"
      >
        {{ option.label }}
      </a>
    </el-menu>
  </el-dropdown>
</template>

<script setup lang="ts">
  import Icon from '~/components/ui/atoms/Icon.vue'

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

<style scoped lang="scss">
  @use 'sass:map';

  // Коллекция цветов
  $colors: (
    text-primary: #374151,
    text-secondary: #4b5563,
    text-tertiary: #6b7280,
    text-hover: #4f46e5,
    bg-hover: #f3f4f6,
    bg-white: #ffffff,
    border: #e5e7eb,
    shadow: rgba(0, 0, 0, 0.1)
  );

  // Размеры и отступы
  $spacing: (
    1: 0.25rem,
    1-5: 0.375rem,
    2: 0.5rem,
    3: 0.75rem,
    4: 1rem,
    6: 1.5rem,
    8: 2rem,
    10: 2.5rem
  );

  // Функции
  @function color($key) {
    @return map.get($colors, $key);
  }

  @function spacing($key) {
    @return map.get($spacing, $key);
  }

  .sort-dropdown {
    position: relative;

    &__trigger {
      display: flex;
      align-items: center;
      gap: spacing(1);
      font-size: 0.75rem;
      font-weight: 500;
      color: color(text-tertiary);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: color(text-hover);
      }
    }

    &__menu {
      position: absolute;
      right: 0;
      z-index: 10;
      margin-top: spacing(2);
      width: 10rem;
      transform-origin: top right;
      border-radius: 0.375rem;
      background-color: color(bg-white);
      padding: spacing(1) 0;
      box-shadow:
        0 10px 15px -3px color(shadow),
        0 4px 6px -2px color(shadow);
      outline: none;

      // Анимации для элемента (заменяем data-атрибуты на CSS классы)
      &[data-closed='true'] {
        opacity: 0;
        transform: scale(0.95);
      }

      &[data-enter='true'] {
        transition-duration: 100ms;
        transition-timing-function: ease-out;
      }

      &[data-leave='true'] {
        transition-duration: 75ms;
        transition-timing-function: ease-in;
      }
    }

    &__option {
      display: block;
      padding: spacing(1-5) spacing(3);
      font-size: 0.875rem;
      color: color(text-primary);
      text-decoration: none;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: color(bg-hover);
      }
    }
  }

  // Анимационные классы (если el-menu использует их)
  .scale-95 {
    transform: scale(0.95);
  }

  .transform {
    transform: translateZ(0);
  }

  .opacity-0 {
    opacity: 0;
  }

  .duration-100 {
    transition-duration: 100ms;
  }

  .duration-75 {
    transition-duration: 75ms;
  }

  .ease-out {
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  .ease-in {
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }
</style>
