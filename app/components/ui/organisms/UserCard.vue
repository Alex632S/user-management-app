<template>
  <div
    class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg"
  >
    <div class="h-32 bg-gradient-to-r from-indigo-500 to-indigo-600 relative">
      <div class="absolute -bottom-12 left-6">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="h-24 w-24 rounded-full border-4 border-white bg-white"
        />
      </div>
    </div>

    <!-- Контент карточки с редактируемыми полями -->
    <div class="pt-16 pb-6 px-6">
      <form class="space-y-4" @submit.prevent="saveChanges">
        <!-- Верхняя часть с именем, ролью и статусом -->
        <div class="flex justify-between items-start gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Имя <span class="text-red-500">*</span>
            </label>
            <input
              v-model="editForm.name"
              type="text"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              :class="{ 'border-red-300': errors.name }"
              @input="checkChanges"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <div class="w-40">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Роль <span class="text-red-500">*</span>
            </label>
            <select
              v-model="editForm.role"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @change="checkChanges"
            >
              <option value="admin">Администратор</option>
              <option value="editor">Редактор</option>
              <option value="viewer">Наблюдатель</option>
            </select>
          </div>
        </div>

        <!-- Статус и email в одной строке -->
        <div class="flex gap-4">
          <div class="w-32">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Статус <span class="text-red-500">*</span>
            </label>
            <select
              v-model="editForm.status"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @change="checkChanges"
            >
              <option value="active">Активен</option>
              <option value="blocked">Заблокирован</option>
            </select>
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              v-model="editForm.email"
              type="email"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              :class="{ 'border-red-300': errors.email }"
              @input="checkChanges"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <!-- Телефон -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Телефон <span class="text-red-500">*</span>
          </label>
          <input
            v-model="editForm.phone"
            type="tel"
            required
            placeholder="+1 (555) 123-4567"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            :class="{ 'border-red-300': errors.phone }"
            @input="checkChanges"
          />
          <p v-if="errors.phone" class="mt-1 text-xs text-red-600">
            {{ errors.phone }}
          </p>
        </div>

        <!-- Отдел и локация (для ExtendedUser) -->
        <template v-if="isExtendedUser(user)">
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Отдел
              </label>
              <select
                v-model="editForm.department"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                @change="checkChanges"
              >
                <option value="">Не выбран</option>
                <option v-for="dept in DEPARTMENTS" :key="dept" :value="dept">
                  {{ dept }}
                </option>
              </select>
            </div>

            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Локация
              </label>
              <select
                v-model="editForm.location"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                @change="checkChanges"
              >
                <option value="">Не выбрана</option>
                <option v-for="loc in LOCATIONS" :key="loc" :value="loc">
                  {{ loc }}
                </option>
              </select>
            </div>
          </div>
        </template>

        <!-- Дата регистрации и последнего входа (только для просмотра) -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Зарегистрирован:</span>
              <span class="ml-2 text-gray-900">{{
                formatDate(user.registeredAt)
              }}</span>
            </div>
            <div>
              <span class="text-gray-500">Последний вход:</span>
              <span class="ml-2 text-gray-900">{{
                formatDate(user.lastLogin)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Кнопки управления -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            v-if="hasChanges"
            type="button"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            @click="cancelChanges"
          >
            Отмена
          </button>
          <button
            type="submit"
            :disabled="saving || !hasChanges || !isValid"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
          <button
            type="button"
            class="px-4 py-2 border border-red-300 text-red-700 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
            title="Удалить пользователя"
            @click="$emit('delete', user)"
          >
            Удалить
          </button>
        </div>

        <!-- Индикатор изменений -->
        <div
          v-if="hasChanges"
          class="text-xs text-amber-600 bg-amber-50 p-2 rounded-md text-center"
        >
          ⚡ Есть несохраненные изменения
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch } from 'vue'
  import type { User, ExtendedUser, UserFormData } from '~/types/user'
  import { DEPARTMENTS, LOCATIONS } from '~/types/user'

  const props = defineProps<{
    user: User | ExtendedUser
  }>()

  const emit = defineEmits<{
    (e: 'save', id: string, data: Partial<UserFormData>): void
    (e: 'delete', user: User | ExtendedUser): void
  }>()

  const saving = ref(false)
  const originalData = ref<UserFormData | null>(null)
  const errors = reactive<Partial<Record<keyof UserFormData, string>>>({})

  // Форма для редактирования
  const editForm = reactive<UserFormData>({
    name: props.user.name,
    email: props.user.email,
    phone: props.user.phone,
    role: props.user.role,
    status: props.user.status,
    department: isExtendedUser(props.user) ? props.user.department : '',
    location: isExtendedUser(props.user) ? props.user.location : ''
  })

  // Сохраняем исходные данные при монтировании и при смене пользователя
  watch(
    () => props.user,
    (newUser) => {
      editForm.name = newUser.name
      editForm.email = newUser.email
      editForm.phone = newUser.phone
      editForm.role = newUser.role
      editForm.status = newUser.status
      editForm.department = isExtendedUser(newUser) ? newUser.department : ''
      editForm.location = isExtendedUser(newUser) ? newUser.location : ''

      originalData.value = { ...editForm }

      // Очищаем ошибки
      Object.keys(errors).forEach((key) => {
        delete errors[key as keyof typeof errors]
      })
    },
    { immediate: true }
  )

  // Проверка на наличие изменений
  const hasChanges = computed(() => {
    if (!originalData.value) return false

    return (
      editForm.name !== originalData.value.name ||
      editForm.email !== originalData.value.email ||
      editForm.phone !== originalData.value.phone ||
      editForm.role !== originalData.value.role ||
      editForm.status !== originalData.value.status ||
      editForm.department !== originalData.value.department ||
      editForm.location !== originalData.value.location
    )
  })

  // Валидация формы
  const isValid = computed(() => {
    return (
      editForm.name.trim() !== '' &&
      /^\S+@\S+\.\S+$/.test(editForm.email) &&
      editForm.phone.trim() !== '' &&
      (!editForm.phone || /^\+?[0-9\s\-\(\)]{7,20}$/.test(editForm.phone))
    )
  })

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  function isExtendedUser(user: User | ExtendedUser): user is ExtendedUser {
    return 'department' in user
  }

  function validate(): boolean {
    errors.name = editForm.name.trim() ? '' : 'Имя обязательно'
    errors.email = /^\S+@\S+\.\S+$/.test(editForm.email) ? '' : 'Неверный email'
    errors.phone = editForm.phone.trim() ? '' : 'Телефон обязателен'

    if (editForm.phone && !/^\+?[0-9\s\-\(\)]{7,20}$/.test(editForm.phone)) {
      errors.phone = 'Неверный формат телефона'
    }

    return !errors.name && !errors.email && !errors.phone
  }

  function checkChanges(): void {
    // Просто триггерим computed свойство
  }

  function cancelChanges(): void {
    if (originalData.value) {
      editForm.name = originalData.value.name
      editForm.email = originalData.value.email
      editForm.phone = originalData.value.phone
      editForm.role = originalData.value.role
      editForm.status = originalData.value.status
      editForm.department = originalData.value.department
      editForm.location = originalData.value.location
    }
  }

  async function saveChanges(): Promise<void> {
    if (!validate() || !hasChanges.value) return

    saving.value = true
    try {
      await emit('save', props.user.id, { ...editForm })
      originalData.value = { ...editForm }
    } finally {
      saving.value = false
    }
  }
</script>
