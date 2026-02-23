<template>
  <component
    :is="tag"
    :class="[
      'inline-flex items-center justify-center font-medium select-none',
      sizeClasses,
      variantClasses,
      {
        'opacity-50 cursor-not-allowed': disabled
      }
    ]"
    :style="customStyles"
    v-bind="$attrs"
  >
    <img
      v-if="src && !error"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      :class="shape === 'circle' ? 'rounded-full' : 'rounded-lg'"
      @error="onError"
      loading="lazy"
    />

    <div
      v-else-if="initials"
      class="flex items-center justify-center w-full h-full"
      :class="textSizeClasses"
    >
      {{ initials }}
    </div>

    <Icon
      v-else
      :name="fallbackIcon"
      class="w-1/2 h-1/2"
      :class="textSizeClasses"
    />

    <span
      v-if="status"
      class="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-white"
      :class="statusClasses"
      :aria-label="`Status: ${status}`"
    />
  </component>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type AvatarShape = 'circle' | 'square'
  type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

  interface Props {
    /** URL изображения */
    src?: string
    /** Альтернативный текст */
    alt?: string
    /** Инициалы (если нет изображения) */
    initials?: string
    /** Размер аватара */
    size?: AvatarSize
    /** Форма аватара */
    shape?: AvatarShape
    /** Статус пользователя */
    status?: AvatarStatus
    /** Отключен ли аватар */
    disabled?: boolean
    /** Кастомный цвет фона (для инициалов) */
    bgColor?: string
    /** Кастомный цвет текста */
    textColor?: string
    /** HTML тег */
    tag?: string
    /** Иконка для fallback */
    fallbackIcon?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    src: '',
    alt: 'avatar',
    initials: '',
    size: 'md',
    shape: 'circle',
    status: undefined,
    disabled: false,
    bgColor: '',
    textColor: '',
    tag: 'span',
    fallbackIcon: 'heroicons:user-20-solid'
  })

  const emit = defineEmits<{
    (e: 'error', event: Event): void
    (e: 'load', event: Event): void
  }>()

  const error = ref(false)

  // Карта размеров
  const sizeMap: Record<
    AvatarSize,
    {
      container: string
      text: string
    }
  > = {
    xs: {
      container: 'w-6 h-6',
      text: 'text-xs'
    },
    sm: {
      container: 'w-8 h-8',
      text: 'text-sm'
    },
    md: {
      container: 'w-10 h-10',
      text: 'text-base'
    },
    lg: {
      container: 'w-12 h-12',
      text: 'text-lg'
    },
    xl: {
      container: 'w-16 h-16',
      text: 'text-xl'
    }
  }

  const sizeClasses = computed(() => sizeMap[props.size].container)
  const textSizeClasses = computed(() => sizeMap[props.size].text)

  // Варианты статуса
  const statusClasses = computed(() => {
    const statusMap = {
      online: 'bg-green-400',
      offline: 'bg-gray-400',
      away: 'bg-yellow-400',
      busy: 'bg-red-400'
    }
    return statusMap[props.status!]
  })

  // Кастомные стили для фона и текста
  const customStyles = computed(() => ({
    backgroundColor: props.bgColor || (props.initials ? '#e2e8f0' : undefined),
    color: props.textColor
  }))

  // Обработка ошибки загрузки изображения
  const onError = (event: Event) => {
    error.value = true
    emit('error', event)
  }

  const variantClasses = computed(() => {
    if (error.value || (!props.src && !props.initials)) {
      return 'bg-gray-200 text-gray-600'
    }
    if (props.initials && !props.src) {
      return 'bg-gray-200 text-gray-700 font-medium'
    }
    return ''
  })
</script>
