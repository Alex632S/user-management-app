<template>
  <div>
    <div class="m-3">
      <Avatar />
    </div>
    <div class="m-3 flex space-x-2">
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="default">Default</Badge>
    </div>
    <div class="m-3 flex space-x-2">
      <Icon name="plus" color="blue-600" size="6" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Avatar from '~/components/ui/atoms/Avatar.vue'
  import Badge from '~/components/ui/atoms/Badge.vue'
  import Icon from '~/components/ui/atoms/Icon.vue'
</script>
