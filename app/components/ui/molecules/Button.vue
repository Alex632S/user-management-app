<template>
  <button
    class="button"
    :class="[
      `button--${variant}`,
      `button--${size}`,
      {
        'button--full-width': fullWidth,
        'button--disabled': disabled,
        'button--rounded': rounded,
        'button--icon-only': iconOnly
      }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="button__spinner">
      <svg class="button__spinner-icon" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          stroke-opacity="0.25"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>

    <span v-else-if="icon && !loading" class="button__icon">
      <Icon :name="icon" :size="iconSize" />
    </span>

    <span v-if="!iconOnly && !loading" class="button__text">
      <slot />
    </span>

    <span
      v-if="rightIcon && !loading && !iconOnly"
      class="button__icon button__icon--right"
    >
      <Icon :name="rightIcon" :size="iconSize" />
    </span>
  </button>
</template>

<script setup>
  import { computed } from 'vue'
  import Icon from '~/components/ui/atoms/Icon.vue'

  const props = defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: (value) =>
        [
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'outline',
          'ghost'
        ].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    rightIcon: {
      type: String,
      default: null
    },
    rounded: {
      type: Boolean,
      default: false
    },
    iconOnly: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['click'])

  const iconSize = computed(() => {
    const sizes = {
      sm: '4',
      md: '5',
      lg: '6'
    }
    return sizes[props.size] || '5'
  })
</script>

<style scoped lang="scss">
  @use 'sass:map';

  $colors: (
    primary: (
      bg: #4f46e5,
      bg-hover: #4338ca,
      text: #ffffff,
      border: #4f46e5
    ),
    secondary: (
      bg: #6b7280,
      bg-hover: #4b5563,
      text: #ffffff,
      border: #6b7280
    ),
    success: (
      bg: #10b981,
      bg-hover: #059669,
      text: #ffffff,
      border: #10b981
    ),
    danger: (
      bg: #ef4444,
      bg-hover: #dc2626,
      text: #ffffff,
      border: #ef4444
    ),
    warning: (
      bg: #f59e0b,
      bg-hover: #d97706,
      text: #ffffff,
      border: #f59e0b
    ),
    outline: (
      bg: transparent,
      bg-hover: #f3f4f6,
      text: #4f46e5,
      border: #4f46e5
    ),
    ghost: (
      bg: transparent,
      bg-hover: #f3f4f6,
      text: #4f46e5,
      border: transparent
    )
  );

  @function color($variant, $key) {
    @return map.get($colors, $variant, $key);
  }

  $sizes: (
    sm: (
      padding: 0.5rem 0.75rem,
      font-size: 0.75rem,
      gap: 0.375rem,
      icon-size: 1rem,
      rounded-size: 2rem
    ),
    md: (
      padding: 0.5rem 1rem,
      font-size: 0.875rem,
      gap: 0.5rem,
      icon-size: 1.25rem,
      rounded-size: 2.5rem
    ),
    lg: (
      padding: 0.625rem 1.25rem,
      font-size: 1rem,
      gap: 0.625rem,
      icon-size: 1.5rem,
      rounded-size: 3rem
    )
  );

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 1px solid transparent;

    &:focus {
      outline: none;
      ring: 2px solid rgba(79, 70, 229, 0.5);
    }

    &:active {
      transform: translateY(0);
    }

    &--full-width {
      width: 100%;
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    // Круглая кнопка
    &--rounded {
      border-radius: 9999px;

      &.button--icon-only {
        border-radius: 9999px;
        padding: 0;

        @each $size, $values in $sizes {
          &.button--#{$size} {
            width: map.get($values, rounded-size);
            height: map.get($values, rounded-size);
          }
        }
      }
    }

    &--icon-only {
      padding: 0;

      .button__icon {
        margin: 0;
      }

      @each $size, $values in $sizes {
        &.button--#{$size} {
          width: map.get($values, rounded-size);
          height: map.get($values, rounded-size);

          .button__icon {
            width: map.get($values, icon-size);
            height: map.get($values, icon-size);
          }
        }
      }
    }

    @each $variant, $colors-map in $colors {
      &--#{$variant} {
        background-color: color($variant, bg);
        color: color($variant, text);
        border-color: color($variant, border);

        &:hover:not(:disabled) {
          background-color: color($variant, bg-hover);
        }

        &:focus {
          ring-color: color($variant, bg);
        }
      }
    }

    @each $size, $values in $sizes {
      &--#{$size} {
        padding: map.get($values, padding);
        font-size: map.get($values, font-size);
        gap: map.get($values, gap);

        .button__icon {
          width: map.get($values, icon-size);
          height: map.get($values, icon-size);

          :deep(svg) {
            width: 100%;
            height: 100%;
          }
        }

        .button__spinner-icon {
          width: map.get($values, icon-size);
          height: map.get($values, icon-size);
        }
      }
    }

    &__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      &--right {
        order: 2;
      }
    }

    &__text {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    &__spinner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    &__spinner-icon {
      animation: spin 1s linear infinite;
    }
  }
</style>
