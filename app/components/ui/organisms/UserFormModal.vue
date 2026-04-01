<template>
  <div class="modal">
    <div class="modal__container">
      <div class="modal__overlay" @click="$emit('close')" />

      <div class="modal__content">
        <h3 class="modal__title">
          {{
            mode === 'create'
              ? 'Создать пользователя'
              : 'Редактировать пользователя'
          }}
        </h3>

        <form class="modal__form" @submit.prevent="handleSubmit">
          <div class="modal__field">
            <label class="modal__label">Имя *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="modal__input"
              :class="{ 'modal__input--error': errors.name }"
            />
            <p v-if="errors.name" class="modal__error">
              {{ errors.name }}
            </p>
          </div>

          <div class="modal__field">
            <label class="modal__label">Email *</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="modal__input"
              :class="{ 'modal__input--error': errors.email }"
            />
            <p v-if="errors.email" class="modal__error">
              {{ errors.email }}
            </p>
          </div>

          <div class="modal__field">
            <label class="modal__label">Телефон *</label>
            <input
              v-model="form.phone"
              type="tel"
              required
              placeholder="+1 (555) 123-4567"
              class="modal__input"
              :class="{ 'modal__input--error': errors.phone }"
            />
            <p v-if="errors.phone" class="modal__error">
              {{ errors.phone }}
            </p>
          </div>

          <div class="modal__field">
            <label class="modal__label">Роль *</label>
            <select v-model="form.role" required class="modal__select">
              <option value="admin">Администратор</option>
              <option value="editor">Редактор</option>
              <option value="viewer">Наблюдатель</option>
            </select>
          </div>

          <div class="modal__field">
            <label class="modal__label">Статус *</label>
            <select v-model="form.status" required class="modal__select">
              <option value="active">Активен</option>
              <option value="blocked">Заблокирован</option>
            </select>
          </div>

          <div class="modal__field">
            <label class="modal__label">Отдел</label>
            <select v-model="form.department" class="modal__select">
              <option value="">Не выбран</option>
              <option v-for="dept in DEPARTMENTS" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>

          <div class="modal__field">
            <label class="modal__label">Локация</label>
            <select v-model="form.location" class="modal__select">
              <option value="">Не выбрана</option>
              <option v-for="loc in LOCATIONS" :key="loc" :value="loc">
                {{ loc }}
              </option>
            </select>
          </div>

          <div class="modal__actions">
            <button
              type="button"
              class="modal__button modal__button--cancel"
              @click="$emit('close')"
            >
              Отмена
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="modal__button modal__button--submit"
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

<style lang="scss" scoped>
  .modal {
    position: fixed;
    inset: 0;
    z-index: 50;
    overflow-y: auto;

    &__container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 0 1rem;
    }

    &__overlay {
      position: fixed;
      inset: 0;
      background-color: black;
      opacity: 0.3;
      cursor: pointer;
    }

    &__content {
      position: relative;
      background-color: white;
      border-radius: 0.5rem;
      max-width: 28rem;
      width: 100%;
      padding: 1.5rem;
    }

    &__title {
      font-size: 1.125rem;
      font-weight: 500;
      color: rgb(17, 24, 39);
      margin-bottom: 1rem;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__field {
      display: flex;
      flex-direction: column;
    }

    &__label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgb(55, 65, 81);
      margin-bottom: 0.25rem;
    }

    &__input {
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      border: 1px solid rgb(209, 213, 219);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      font-size: 0.875rem;

      &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      &--error {
        border-color: rgb(252, 165, 165);
      }
    }

    &__select {
      display: block;
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      border: 1px solid rgb(209, 213, 219);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      font-size: 0.875rem;
      background-color: white;

      &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }
    }

    &__error {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: rgb(220, 38, 38);
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      padding-top: 1rem;
    }

    &__button {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &--cancel {
        border: 1px solid rgb(209, 213, 219);
        background: transparent;
        color: rgb(55, 65, 81);

        &:hover {
          background-color: rgb(249, 250, 251);
        }
      }

      &--submit {
        background-color: #4f46e5;
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #4338ca;
        }
      }
    }
  }
</style>
