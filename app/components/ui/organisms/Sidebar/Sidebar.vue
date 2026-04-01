<template>
  <aside class="sidebar">
    <div class="sidebar__top">
      <SidebarLogo>
        <slot name="logo" />
      </SidebarLogo>

      <SidebarNav>
        <slot name="nav" />
      </SidebarNav>
    </div>

    <div class="sidebar__bottom">
      <slot name="user" />
    </div>
  </aside>
</template>

<script setup>
  import SidebarLogo from './SidebarLogo.vue'
  import SidebarNav from './SidebarNav.vue'
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 16rem;
    background-color: white;
    border-right: 1px solid rgb(229, 231, 235); // gray-200
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    &__bottom {
      border-top: 1px solid rgb(229, 231, 235); // gray-200
      padding-top: 1rem;
    }
  }
</style>
