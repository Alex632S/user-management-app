<template>
  <div class="search-input">
    <Icon name="search" class="search-input__icon" />
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="search-input__field"
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

<style scoped lang="scss">
  @use 'sass:map';

  $colors: (
    border: #e5e7eb,
    border-focus: #3b82f6,
    text: #111827,
    text-placeholder: #9ca3af,
    icon: #9ca3af
  );

  // Размеры и отступы
  $spacing: (
    2: 0.5rem,
    3: 0.75rem,
    4: 1rem,
    10: 2.5rem
  );

  $border-radius: 0.5rem;
  $font-size: 0.875rem;
  $transition: all 0.2s ease;

  @function color($key) {
    @return map.get($colors, $key);
  }

  @function spacing($key) {
    @return map.get($spacing, $key);
  }

  .search-input {
    position: relative;

    &__icon {
      position: absolute;
      left: spacing(3);
      top: 50%;
      transform: translateY(-50%);
      color: color(icon);
      pointer-events: none;
    }

    &__field {
      width: 100%;
      padding: spacing(2) spacing(4) spacing(2) spacing(10);
      font-size: $font-size;
      border: 1px solid color(border);
      border-radius: $border-radius;
      outline: none;
      transition: $transition;

      &::placeholder {
        color: color(text-placeholder);
      }

      &:focus {
        border-color: color(border-focus);
        box-shadow: 0 0 0 2px rgba(color(border-focus), 0.2);

        @supports not (ring: 2px solid color(border-focus)) {
          box-shadow: 0 0 0 2px color(border-focus);
        }
      }
    }
  }
</style>
