<template>
  <el-dialog>
    <dialog
      id="sidebar-mobile"
      class="backdrop:bg-transparent hidden lg:hidden"
    >
      <el-dialog-backdrop
        class="fixed inset-0 bg-gray-500/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      ></el-dialog-backdrop>

      <div tabindex="0" class="fixed inset-0 flex focus:outline-none">
        <el-dialog-panel
          class="relative mr-16 flex w-full max-w-xs flex-1 transform transition-all duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <div
            class="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0"
          >
            <button
              type="button"
              command="close"
              :commandfor="id"
              class="-m-2.5 p-2.5"
              @click="$emit('close')"
            >
              <span class="sr-only">Закрыть sidebar</span>
              <Icon name="x" class="w-6 h-6 text-gray-900" />
            </button>
          </div>

          <div
            class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-gray-200"
          >
            <div class="flex h-16 shrink-0 items-center">
              <slot name="logo">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </slot>
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <slot name="nav-items" />
                  </ul>
                </li>
                <li class="mt-auto">
                  <slot name="user" />
                </li>
              </ul>
            </nav>
          </div>
        </el-dialog-panel>
      </div>
    </dialog>
  </el-dialog>
</template>

<script setup lang="ts">
  import Icon from '../atoms/Icon.vue'

  defineProps({
    id: {
      type: String,
      default: 'sidebar-mobile'
    }
  })

  defineEmits(['close'])

  // Добавляем метод для открытия модалки
  const open = () => {
    const dialog = document.getElementById(
      'sidebar-mobile'
    ) as HTMLDialogElement
    if (dialog) dialog.showModal()
  }

  defineExpose({ open })
</script>
