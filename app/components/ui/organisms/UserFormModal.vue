<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-black opacity-30" @click="$emit('close')" />

      <div class="relative bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{
            mode === 'create'
              ? 'Создать пользователя'
              : 'Редактировать пользователя'
          }}
        </h3>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <!-- Имя -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Имя *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              :class="{ 'border-red-300': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Email *</label
            >
            <input
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              :class="{ 'border-red-300': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Телефон -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Телефон *</label
            >
            <input
              v-model="form.phone"
              type="tel"
              required
              placeholder="+1 (555) 123-4567"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              :class="{ 'border-red-300': errors.phone }"
            />
            <p v-if="errors.phone" class="mt-1 text-xs text-red-600">
              {{ errors.phone }}
            </p>
          </div>

          <!-- Роль -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Роль *</label
            >
            <select
              v-model="form.role"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="admin">Администратор</option>
              <option value="editor">Редактор</option>
              <option value="viewer">Наблюдатель</option>
            </select>
          </div>

          <!-- Статус -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Статус *</label
            >
            <select
              v-model="form.status"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="active">Активен</option>
              <option value="blocked">Заблокирован</option>
            </select>
          </div>

          <!-- Отдел (опционально) -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Отдел</label>
            <select
              v-model="form.department"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Не выбран</option>
              <option v-for="dept in DEPARTMENTS" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>

          <!-- Локация (опционально) -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Локация</label
            >
            <select
              v-model="form.location"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Не выбрана</option>
              <option v-for="loc in LOCATIONS" :key="loc" :value="loc">
                {{ loc }}
              </option>
            </select>
          </div>

          <!-- Кнопки -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              @click="$emit('close')"
            >
              Отмена
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ loading ? 'Создание...' : 'Создать пользователя' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watch } from 'vue'
  import type { UserFormData } from '~/types/user'
  import { DEPARTMENTS, LOCATIONS } from '~/types/user'

  const props = defineProps<{
    mode: 'create' | 'edit'
    initialData?: Partial<UserFormData>
    loading?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save', payload: UserFormData): void
  }>()

  const defaultForm: UserFormData = {
    name: '',
    email: '',
    phone: '',
    role: 'viewer',
    status: 'active',
    department: '',
    location: ''
  }

  const form = reactive<UserFormData>({ ...defaultForm })
  const errors = reactive<Partial<Record<keyof UserFormData, string>>>({})

  watch(
    () => props.initialData,
    (data) => {
      if (data) {
        Object.assign(form, defaultForm, data)
      } else {
        Object.assign(form, defaultForm)
      }
    },
    { immediate: true }
  )

  function validate(): boolean {
    errors.name = form.name.trim() ? '' : 'Имя обязательно'
    errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Неверный email'
    errors.phone = form.phone.trim() ? '' : 'Телефон обязателен'

    if (form.phone && !/^\+?[0-9\s\-\(\)]{7,20}$/.test(form.phone)) {
      errors.phone = 'Неверный формат телефона'
    }

    return !errors.name && !errors.email && !errors.phone
  }

  function handleSubmit(): void {
    if (!validate()) return
    emit('save', { ...form })
  }
</script>
