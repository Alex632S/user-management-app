<template>
  <div
    class="fixed top-4 right-4 z-50 max-w-md w-full animate-slide-in"
    :class="{
      'animate-slide-out': closing
    }"
  >
    <div
      class="rounded-lg shadow-lg overflow-hidden"
      :class="{
        'bg-green-50 border border-green-200': type === 'success',
        'bg-red-50 border border-red-200': type === 'error'
      }"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Иконка успеха -->
            <svg
              v-if="type === 'success'"
              class="h-5 w-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- Иконка ошибки -->
            <svg
              v-else
              class="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1">
            <p
              class="text-sm font-medium"
              :class="{
                'text-green-800': type === 'success',
                'text-red-800': type === 'error'
              }"
            >
              {{ message }}
            </p>
            <div
              v-if="errors && Object.keys(errors).length > 0"
              class="mt-2 text-sm"
              :class="{
                'text-green-700': type === 'success',
                'text-red-700': type === 'error'
              }"
            >
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="(errorMsg, field) in errors" :key="field">
                  <span class="font-medium">{{ field }}:</span> {{ errorMsg }}
                </li>
              </ul>
            </div>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="{
                'text-green-500 hover:text-green-600 focus:ring-green-500':
                  type === 'success',
                'text-red-500 hover:text-red-600 focus:ring-red-500':
                  type === 'error'
              }"
              @click="close"
            >
              <span class="sr-only">Закрыть</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

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

  // Автоматическое закрытие для успешных уведомлений
  if (props.type === 'success') {
    setTimeout(() => {
      close()
    }, 3000)
  }
</script>

<style scoped>
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

  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }

  .animate-slide-out {
    animation: slide-out 0.2s ease-in forwards;
  }
</style>
