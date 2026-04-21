<template>
  <Table :data="data" loader="Загрузка...">
    <Column :selection="true" />
    <Column head="Id" data-key="id" />
    <Column head="Email" data-key="email" />
    <Column head="Email" data-key="email" />
    <span>Что-то ещё</span>
  </Table>
</template>

<script setup>
  import Table from '~/ui-new/Table/Table'
  import { data, title } from '~/ui-new/data-for-table'
  import Column from '~/ui-new/Table/Column'
</script>
