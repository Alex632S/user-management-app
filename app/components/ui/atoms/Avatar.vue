<template>
  <img class="avatar" :src="src" :alt="alt" role="img" />
</template>

<script setup lang="ts">
  import defaultAvatar from '@/assets/img/default-avatar.png'

  defineProps({
    src: {
      type: String,
      default: defaultAvatar
    },
    alt: {
      type: String,
      default: 'Avatar'
    }
  })
</script>

<style lang="scss" scoped>
  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0.3px 0.3px 5px rgb(30, 28, 28);
  }
</style>
