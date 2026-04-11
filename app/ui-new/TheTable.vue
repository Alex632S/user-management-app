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
        <tr v-for="(row, index) in dynamicData" :key="index">
          <td>
            <input type="checkbox" class="checkbox" />
          </td>
          <td
            v-for="(_value, colIndex) in Object.keys(row)"
            :key="colIndex"
            :class="`column-${colIndex + 1}`"
          >
            <slot :name="`column-${_value}`" :table-data="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: Array,
      default: () => []
    },
    dynamicData: {
      type: Array,
      default: () => []
    }
  })
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
