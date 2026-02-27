<template>
  <aside
    class="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between h-full"
  >
    <div>
      <SidebarLogo>
        <slot name="logo" />
      </SidebarLogo>

      <SidebarNav>
        <slot name="nav" />
      </SidebarNav>
    </div>

    <div class="border-t border-gray-200 pt-4">
      <slot name="user" />
    </div>
  </aside>
</template>

<script setup>
  import SidebarLogo from './SidebarLogo.vue'
  import SidebarNav from './SidebarNav.vue'
</script>
