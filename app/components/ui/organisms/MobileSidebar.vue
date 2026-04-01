<template>
  <!-- TODO -->
  <!-- Переделать все -->
  <el-dialog>
    <dialog :id="id" class="sidebar-mobile-dialog">
      <el-dialog-backdrop class="sidebar-mobile-backdrop" />

      <div tabindex="0" class="sidebar-mobile-container">
        <el-dialog-panel class="sidebar-mobile-panel">
          <div class="sidebar-mobile-close-wrapper">
            <button
              type="button"
              command="close"
              :commandfor="id"
              class="sidebar-mobile-close-button"
              @click="$emit('close')"
            >
              <span class="sr-only">Закрыть sidebar</span>
              <Icon name="x" class="sidebar-mobile-close-icon" />
            </button>
          </div>

          <div class="sidebar-mobile-content">
            <div class="sidebar-mobile-logo-wrapper">
              <slot name="logo">
                <img
                  class="sidebar-mobile-logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </slot>
            </div>
            <nav class="sidebar-mobile-nav">
              <ul role="list" class="sidebar-mobile-nav-list">
                <li>
                  <ul role="list" class="sidebar-mobile-nav-items">
                    <slot name="nav-items" />
                  </ul>
                </li>
                <li class="sidebar-mobile-nav-user">
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

  const open = () => {
    const dialog = document.getElementById(
      'sidebar-mobile'
    ) as HTMLDialogElement
    if (dialog) dialog.showModal()
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped>
  .sidebar-mobile-dialog {
    backdrop-filter: blur(4px);

    &::backdrop {
      background-color: transparent;
    }
  }

  .sidebar-mobile-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(107, 114, 128, 0.5); // gray-500/50
    transition-property: opacity;
    transition-duration: 300ms;
    transition-timing-function: linear;

    &[data-closed] {
      opacity: 0;
    }
  }

  .sidebar-mobile-container {
    position: fixed;
    inset: 0;
    display: flex;
    outline: none;

    &:focus {
      outline: none;
    }
  }

  .sidebar-mobile-panel {
    position: relative;
    margin-right: 4rem; // mr-16
    width: 100%;
    max-width: 20rem; // max-w-xs
    flex: 1;
    transform: translateX(0);
    transition-property: transform;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;

    &[data-closed] {
      transform: translateX(-100%);
    }
  }

  .sidebar-mobile-close-wrapper {
    position: absolute;
    left: 100%;
    top: 0;
    display: flex;
    width: 4rem;
    justify-content: center;
    padding-top: 1.25rem;
    transition-property: opacity;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;

    &[data-closed] {
      opacity: 0;
    }
  }

  .sidebar-mobile-close-button {
    margin: -0.625rem;
    padding: 0.625rem;
    background: none;
    border: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  .sidebar-mobile-close-icon {
    width: 1.5rem; // w-6
    height: 1.5rem; // h-6
    color: rgb(17, 24, 39); // text-gray-900
  }

  .sidebar-mobile-content {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    gap: 1.25rem; // gap-y-5
    overflow-y: auto;
    background-color: white;
    padding-left: 1.5rem; // px-6
    padding-right: 1.5rem; // px-6
    padding-bottom: 1rem; // pb-4
    box-shadow: 0 0 0 1px rgb(229, 231, 235); // ring-1 ring-gray-200
  }

  .sidebar-mobile-logo-wrapper {
    display: flex;
    height: 4rem; // h-16
    flex-shrink: 0;
    align-items: center;
  }

  .sidebar-mobile-logo {
    height: 2rem; // h-8
    width: auto;
  }

  .sidebar-mobile-nav {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .sidebar-mobile-nav-list {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1.75rem; // gap-y-7
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .sidebar-mobile-nav-items {
    margin-left: -0.5rem; // -mx-2
    margin-right: -0.5rem; // -mx-2
    display: flex;
    flex-direction: column;
    gap: 0.25rem; // space-y-1
    list-style: none;
    padding: 0;
  }

  .sidebar-mobile-nav-user {
    margin-top: auto;
  }
</style>
