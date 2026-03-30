<template>
  <div class="search-field">
    <div class="search-field__icon">
      <Icon name="search" color="blue-600" size="6" />
    </div>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      class="search-field__input"
      @input="handleInput"
      @keyup.enter="handleEnter"
    />
  </div>
</template>

<script setup lang="ts">
  import Icon from '~/components/ui/atoms/Icon.vue'

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

<style scoped lang="scss">
  @use 'sass:map';
  @use 'sass:color';

  $colors: (
    text-primary: #111827,
    text-placeholder: #9ca3af,
    border-default: #d1d5db,
    border-focus: #6366f1,
    background: white
  );

  @function color($key) {
    @return map.get($colors, $key);
  }

  .search-field {
    position: relative;

    &__icon {
      position: absolute;
      top: 3px;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      padding-left: 0.75rem;
      pointer-events: none;
    }

    &__input {
      width: 100%;
      border-radius: 0.5rem;
      background-color: color(background);
      padding: 0.625rem 1rem 0.625rem 2.5rem;
      color: color(text-primary);
      outline: none;
      transition: all 0.15s ease;
      box-shadow: 0 0 0 1px color(border-default);

      &::placeholder {
        color: color(text-placeholder);
      }

      &:focus {
        box-shadow: 0 0 0 2px color(border-focus);
      }
    }
  }
</style>
