<template>
  <Table :data="data" loader="Загрузка...">
    <Column key="id" head="Id" />
    <Column key="email" head="Email" />
    <Column key="email" head="Email" />
    <span>Что-то ещё</span>
  </Table>
</template>

<script setup>
  import Table from '~/ui-new/render-function'
  import { data, title } from '~/ui-new/data-for-table'
  import Column from '~/ui-new/Column'
</script>
