<template>
  <nav class="page-header">
    <div class="page-header__container">
      <div class="page-header__wrapper">
        <h1 class="page-header__title">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <div v-if="showSearch" class="page-header__search-wrapper">
          <slot name="search">
            <SearchBar
              v-model="searchValue"
              :placeholder="searchPlaceholder"
              @search="$emit('search', $event)"
            />
          </slot>
        </div>
      </div>

      <div v-if="showBreadcrumbs" class="page-header__breadcrumbs">
        <slot name="breadcrumbs">
          <span>Главная</span>
          <span v-if="currentPage" class="page-header__breadcrumbs-separator"
            >/</span
          >
          <span v-if="currentPage" class="page-header__breadcrumbs-current">
            {{ currentPage }}
          </span>
        </slot>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SearchBar from '../molecules/SearchBar.vue'

  defineProps({
    title: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      default: 'Поиск...'
    },
    showBreadcrumbs: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['search', 'update:searchValue'])

  const searchValue = ref('')
</script>

<style lang="scss" scoped>
  .page-header {
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); // shadow-sm
    border-bottom: 1px solid rgb(229, 231, 235); // border-gray-200
    position: sticky;
    top: 0;
    z-index: 10;

    &__container {
      padding-left: 1.5rem; // px-6
      padding-right: 1.5rem; // px-6
      padding-top: 1rem; // py-4
      padding-bottom: 1rem; // py-4
    }

    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__title {
      font-size: 1.5rem; // text-2xl
      line-height: 2rem; // text-2xl
      font-weight: 600; // font-semibold
      color: rgb(31, 41, 55); // text-gray-800
      margin: 0;
    }

    &__search-wrapper {
      width: 16rem; // w-64
    }

    &__breadcrumbs {
      margin-top: 0.5rem; // mt-2
      font-size: 0.875rem; // text-sm
      line-height: 1.25rem; // text-sm
      color: rgb(75, 85, 99); // text-gray-600
    }

    &__breadcrumbs-separator {
      margin-left: 0.5rem; // mx-2
      margin-right: 0.5rem; // mx-2
    }

    &__breadcrumbs-current {
      font-weight: 500; // font-medium
      color: rgb(17, 24, 39); // text-gray-900
    }
  }
</style>
