<template>
  <div class="user-card">
    <div class="user-card__header">
      <div class="user-card__avatar-wrapper">
        <img :src="user.avatar" :alt="user.name" class="user-card__avatar" />
      </div>
    </div>

    <div class="user-card__content">
      <form class="user-card__form" @submit.prevent="saveChanges">
        <div class="user-card__row">
          <div class="user-card__field">
            <label class="user-card__label">
              Имя <span class="user-card__required">*</span>
            </label>
            <input
              v-model="editForm.name"
              type="text"
              required
              class="user-card__input"
              :class="{ 'user-card__input--error': errors.name }"
              @input="checkChanges"
            />
            <p v-if="errors.name" class="user-card__error">
              {{ errors.name }}
            </p>
          </div>

          <div class="user-card__field user-card__field--small">
            <label class="user-card__label">
              Роль <span class="user-card__required">*</span>
            </label>
            <select
              v-model="editForm.role"
              required
              class="user-card__select"
              @change="checkChanges"
            >
              <option value="admin">Администратор</option>
              <option value="editor">Редактор</option>
              <option value="viewer">Наблюдатель</option>
            </select>
          </div>
        </div>

        <div class="user-card__row">
          <div class="user-card__field user-card__field--status">
            <label class="user-card__label">
              Статус <span class="user-card__required">*</span>
            </label>
            <select
              v-model="editForm.status"
              required
              class="user-card__select"
              @change="checkChanges"
            >
              <option value="active">Активен</option>
              <option value="blocked">Заблокирован</option>
            </select>
          </div>

          <div class="user-card__field">
            <label class="user-card__label">
              Email <span class="user-card__required">*</span>
            </label>
            <input
              v-model="editForm.email"
              type="email"
              required
              class="user-card__input"
              :class="{ 'user-card__input--error': errors.email }"
              @input="checkChanges"
            />
            <p v-if="errors.email" class="user-card__error">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div class="user-card__field">
          <label class="user-card__label">
            Телефон <span class="user-card__required">*</span>
          </label>
          <input
            v-model="editForm.phone"
            type="tel"
            required
            placeholder="+1 (555) 123-4567"
            class="user-card__input"
            :class="{ 'user-card__input--error': errors.phone }"
            @input="checkChanges"
          />
          <p v-if="errors.phone" class="user-card__error">
            {{ errors.phone }}
          </p>
        </div>

        <template v-if="isExtendedUser(user)">
          <div class="user-card__row">
            <div class="user-card__field">
              <label class="user-card__label">Отдел</label>
              <select
                v-model="editForm.department"
                class="user-card__select"
                @change="checkChanges"
              >
                <option value="">Не выбран</option>
                <option v-for="dept in DEPARTMENTS" :key="dept" :value="dept">
                  {{ dept }}
                </option>
              </select>
            </div>

            <div class="user-card__field">
              <label class="user-card__label">Локация</label>
              <select
                v-model="editForm.location"
                class="user-card__select"
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

        <div class="user-card__info">
          <div class="user-card__info-grid">
            <div>
              <span class="user-card__info-label">Зарегистрирован:</span>
              <span class="user-card__info-value">{{
                formatDate(user.registeredAt)
              }}</span>
            </div>
            <div>
              <span class="user-card__info-label">Последний вход:</span>
              <span class="user-card__info-value">{{
                formatDate(user.lastLogin)
              }}</span>
            </div>
          </div>
        </div>

        <div class="user-card__actions">
          <button
            v-if="hasChanges"
            type="button"
            class="user-card__button user-card__button--cancel"
            @click="cancelChanges"
          >
            Отмена
          </button>
          <button
            type="submit"
            :disabled="saving || !hasChanges || !isValid"
            class="user-card__button user-card__button--save"
          >
            {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
          <button
            type="button"
            class="user-card__button user-card__button--delete"
            @click="$emit('delete', user)"
          >
            Удалить
          </button>
        </div>

        <div v-if="hasChanges" class="user-card__changes-indicator">
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

  const editForm = reactive<UserFormData>({
    name: props.user.name,
    email: props.user.email,
    phone: props.user.phone,
    role: props.user.role,
    status: props.user.status,
    department: isExtendedUser(props.user) ? props.user.department : '',
    location: isExtendedUser(props.user) ? props.user.location : ''
  })

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

      Object.keys(errors).forEach((key) => {
        delete errors[key as keyof typeof errors]
      })
    },
    { immediate: true }
  )

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

  function checkChanges(): void {}

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

<style lang="scss" scoped>
  .user-card {
    background-color: white;
    border-radius: 0.75rem; // rounded-xl
    overflow: hidden;
    border: 1px solid rgb(229, 231, 235); // border-gray-200
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05); // shadow-lg

    &__header {
      height: 8rem; // h-32
      background: linear-gradient(
        to right,
        #6366f1,
        #4f46e5
      ); // from-indigo-500 to-indigo-600
      position: relative;
    }

    &__avatar-wrapper {
      position: absolute;
      bottom: -3rem; // -bottom-12
      left: 1.5rem; // left-6
    }

    &__avatar {
      height: 6rem; // h-24
      width: 6rem; // w-24
      border-radius: 9999px; // rounded-full
      border: 4px solid white;
      background-color: white;
      object-fit: cover;
    }

    &__content {
      padding-top: 4rem; // pt-16
      padding-bottom: 1.5rem; // pb-6
      padding-left: 1.5rem; // px-6
      padding-right: 1.5rem; // px-6
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem; // space-y-4
    }

    &__row {
      display: flex;
      gap: 1rem; // gap-4

      @media (max-width: 640px) {
        flex-direction: column;
      }
    }

    &__field {
      flex: 1;

      &--small {
        width: 10rem; // w-40

        @media (max-width: 640px) {
          width: 100%;
        }
      }

      &--status {
        width: 8rem; // w-32

        @media (max-width: 640px) {
          width: 100%;
        }
      }
    }

    &__label {
      display: block;
      font-size: 0.875rem; // text-sm
      font-weight: 500; // font-medium
      color: rgb(55, 65, 81); // text-gray-700
      margin-bottom: 0.25rem; // mb-1
    }

    &__required {
      color: rgb(239, 68, 68); // text-red-500
    }

    &__input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem; // rounded-md
      border: 1px solid rgb(209, 213, 219); // border-gray-300
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); // shadow-sm
      font-size: 0.875rem;

      &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      &--error {
        border-color: rgb(252, 165, 165); // border-red-300
      }
    }

    &__select {
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
      color: rgb(220, 38, 38); // text-red-600
    }

    &__info {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgb(229, 231, 235);
    }

    &__info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      font-size: 0.875rem;
    }

    &__info-label {
      color: rgb(107, 114, 128); // text-gray-500
    }

    &__info-value {
      margin-left: 0.5rem;
      color: rgb(17, 24, 39); // text-gray-900
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem; // space-x-3
      padding-top: 1rem;
      border-top: 1px solid rgb(229, 231, 235);
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

      &--save {
        background-color: #4f46e5;
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #4338ca;
        }
      }

      &--delete {
        border: 1px solid rgb(252, 165, 165);
        background: transparent;
        color: rgb(220, 38, 38);

        &:hover {
          background-color: rgb(254, 242, 242);
        }
      }
    }

    &__changes-indicator {
      margin-top: 0.5rem;
      padding: 0.5rem;
      background-color: rgb(255, 251, 235);
      border-radius: 0.375rem;
      text-align: center;
      font-size: 0.75rem;
      color: rgb(217, 119, 6);
    }
  }
</style>
