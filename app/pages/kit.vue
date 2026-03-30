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
      <Icon name="plus" color="blue-600" size="4" />
      <Icon name="dashboard" color="blue-600" size="5" />
      <Icon name="team" color="blue-600" size="6" />
      <Icon name="projects" color="blue-600" size="8" />
      <Icon name="calendar" color="blue-600" size="10" />
      <Icon name="documents" color="blue-600" size="12" />
      <Icon name="settings" color="blue-600" size="12" />
      <Icon name="chevron-down" color="blue-600" size="4" />
      <Icon name="chevron-up" color="blue-600" size="5" />
      <Icon name="search" color="blue-600" size="6" />
      <Icon name="menu" color="blue-600" size="8" />
      <Icon name="check" color="blue-600" size="10" />
      <Icon name="sort-asc" color="blue-600" size="12" />
      <Icon name="sort-desc" color="blue-600" size="12" />
      <Icon name="sort-desc" color="blue-600" size="5" />
      <Icon name="arrow-up" color="blue-600" size="6" />
      <Icon name="arrow-down" color="blue-600" size="8" />
    </div>
    <div class="m-3">
      <SearchInput />
    </div>

    <div class="m-3">
      <Text tag="p" size="sm" :weight="'normal'" :color="'gray-600'"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem at
        ratione aliquam eveniet praesentium voluptatem nam error rem tenetur?
        Doloribus veniam dolore labore consectetur at facere inventore porro
        ipsam consequatur?</Text
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import Avatar from '~/components/ui/atoms/Avatar.vue'
  import Badge from '~/components/ui/atoms/Badge.vue'
  import Icon from '~/components/ui/atoms/Icon.vue'
  import SearchInput from '~/components/ui/atoms/SearchInput.vue'
  import Text from '~/components/ui/atoms/Text.vue'
</script>
