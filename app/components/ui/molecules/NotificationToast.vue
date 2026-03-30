<template>
  <div
    class="notification"
    :class="{
      'notification--closing': closing
    }"
  >
    <div
      class="notification__container"
      :class="`notification__container--${type}`"
    >
      <div class="notification__content">
        <div class="notification__icon-wrapper">
          <Icon
            :name="type === 'success' ? 'success' : 'error'"
            :color="type === 'success' ? 'green-500' : 'red-500'"
            size="5"
            class="notification__icon"
          />
        </div>

        <div class="notification__message-wrapper">
          <p
            class="notification__message"
            :class="`notification__message--${type}`"
          >
            {{ message }}
          </p>

          <div
            v-if="errors && Object.keys(errors).length > 0"
            class="notification__errors"
            :class="`notification__errors--${type}`"
          >
            <ul class="notification__errors-list">
              <li v-for="(errorMsg, field) in errors" :key="field">
                <span class="notification__errors-field">{{ field }}:</span>
                {{ errorMsg }}
              </li>
            </ul>
          </div>
        </div>

        <div class="notification__close-wrapper">
          <button
            class="notification__close-button"
            :class="`notification__close-button--${type}`"
            @click="close"
          >
            <span class="sr-only">Закрыть</span>
            <Icon
              name="x"
              :color="type === 'success' ? 'green-500' : 'red-500'"
              size="5"
              class="notification__close-icon"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Icon from '~/components/ui/atoms/Icon.vue'

  const props = defineProps<{
    type: 'success' | 'error'
    message: string
    errors?: Record<string, string> | null
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const closing = ref(false)

  const close = (): void => {
    closing.value = true
    setTimeout(() => {
      emit('close')
    }, 200)
  }

  if (props.type === 'success') {
    setTimeout(() => {
      close()
    }, 3000)
  }
</script>

<style scoped lang="scss">
  @use 'sass:map';

  $colors: (
    success: (
      bg: #f0fdf4,
      border: #bbf7d0,
      icon: #4ade80,
      text: #166534,
      hover: #16a34a,
      ring: #22c55e
    ),
    error: (
      bg: #fef2f2,
      border: #fecaca,
      icon: #f87171,
      text: #991b1b,
      hover: #dc2626,
      ring: #ef4444
    )
  );

  $shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  $border-radius-lg: 0.5rem;
  $spacing-1: 0.25rem;
  $spacing-2: 0.5rem;
  $spacing-3: 0.75rem;
  $spacing-4: 1rem;
  $spacing-5: 1.25rem;

  @function color($type, $key) {
    @return map.get($colors, $type, $key);
  }

  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .notification {
    position: fixed;
    top: $spacing-4;
    right: $spacing-4;
    z-index: 50;
    max-width: 28rem;
    width: 100%;
    animation: slide-in 0.3s ease-out;

    &--closing {
      animation: slide-out 0.2s ease-in forwards;
    }

    &__container {
      border-radius: $border-radius-lg;
      box-shadow: $shadow-lg;
      overflow: hidden;

      &--success {
        background-color: color(success, bg);
        border: 1px solid color(success, border);
      }

      &--error {
        background-color: color(error, bg);
        border: 1px solid color(error, border);
      }
    }

    &__content {
      display: flex;
      padding: $spacing-4;
    }

    &__icon-wrapper {
      display: flex;
      flex-shrink: 0;
      align-items: center;
    }

    &__icon {
      height: 1.25rem;
      width: 1.25rem;

      :deep(svg) {
        width: 100%;
        height: 100%;
      }
    }

    &__message-wrapper {
      margin-left: $spacing-3;
      width: 0;
      flex: 1;
    }

    &__message {
      font-size: 0.875rem;
      font-weight: 500;
      overflow-wrap: break-word;

      &--success {
        color: color(success, text);
      }

      &--error {
        color: color(error, text);
      }
    }

    &__errors {
      margin-top: $spacing-2;
      font-size: 0.875rem;

      &--success {
        color: color(success, text);
      }

      &--error {
        color: color(error, text);
      }
    }

    &__errors-list {
      list-style: disc;
      padding-left: $spacing-5;

      li {
        margin-top: $spacing-1;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    &__errors-field {
      font-weight: 500;
    }

    &__close-wrapper {
      margin-left: $spacing-4;
      flex-shrink: 0;
      display: flex;
    }

    &__close-button {
      display: inline-flex;
      border-radius: 0.375rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      align-items: center;
      justify-content: center;

      &:focus {
        outline: none;
      }

      &--success {
        color: color(success, icon);

        &:hover {
          color: color(success, hover);
        }

        &:focus {
          ring: 2px solid color(success, ring);
        }
      }

      &--error {
        color: color(error, icon);

        &:hover {
          color: color(error, hover);
        }

        &:focus {
          ring: 2px solid color(error, ring);
        }
      }
    }

    &__close-icon {
      height: 1.25rem;
      width: 1.25rem;

      :deep(svg) {
        width: 100%;
        height: 100%;
      }
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
