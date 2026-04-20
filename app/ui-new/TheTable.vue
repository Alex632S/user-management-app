<template>
  <div style="margin: 30px" class="table-wrapper">
    <table class="user-table">
      <thead>
        <tr>
          <th>
            <input class="checkbox" type="checkbox" />
          </th>
          <th
            v-for="(itemTitle, indexTitle) in title"
            :key="indexTitle"
            :class="`column-${indexTitle + 1}`"
          >
            {{ itemTitle }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in dynamicData" :key="rowIndex">
          <td>
            <input type="checkbox" class="checkbox" />
          </td>
          <td
            v-for="(header, colIndex) in title"
            :key="colIndex"
            :class="`column-${colIndex + 1}`"
          >
            <!-- 
              Создаем имя слота на основе заголовка:
              'Name' -> 'column-Name'
              'First Name' -> 'column-First Name' (проблема!)
            -->
            <slot
              :name="getSlotName(header)"
              :table-data="row"
              :value="getValueByHeader(row, header)"
            >
              <!-- Fallback: просто показываем значение -->
              {{ getValueByHeader(row, header) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    title: {
      type: Array,
      default: () => []
    },
    dynamicData: {
      type: Array,
      default: () => []
    }
  })

  // Маппинг заголовков на поля в данных
  const headerToFieldMap = {
    Name: 'name',
    'First Name': 'firstName',
    'Last Name': 'lastName',
    Email: 'email',
    Group: 'group',
    'Last Login': 'lastLogin'
  }

  // Получаем имя слота по заголовку (убираем пробелы)
  const getSlotName = (header) => {
    // 'First Name' -> 'column-FirstName'
    const slotName = header.replace(/\s/g, '')
    return `column-${slotName}`
  }

  // Получаем значение из строки данных по заголовку колонки
  const getValueByHeader = (row, header) => {
    const field = headerToFieldMap[header]
    return row[field] || ''
  }
</script>

<style scoped lang="scss">
  @use './styles.scss' as *;

  .table-wrapper {
    background: white;
    border-radius: $radius-lg;
    box-shadow: $shadow-sm;
    overflow: auto;
    margin: $wrapper-margin;
  }

  .user-table {
    width: 100%;
    min-width: $table-min-width;

    th,
    td {
      padding: $cell-padding-y $cell-padding-x;
      text-align: left;
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    th {
      background: $th-background;
      font-weight: 600;
      color: $color-text-secondary;

      &:first-child {
        width: $checkbox-column-width;
      }
    }

    tr:not(:last-child) {
      border-bottom: 1px solid $color-border;
    }

    tbody tr {
      cursor: pointer;
      transition: background $transition-fast;

      &:hover {
        background: $row-hover-background;
      }

      &.selected-row {
        background: $selected-row-background;
      }
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: $user-info-gap;
  }

  .checkbox {
    cursor: pointer;
  }

  .column-1 {
    font-weight: 600;
  }
</style>
