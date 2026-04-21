import { ref, h, onMounted } from 'vue'
import { vTable, vHead, vBody } from '~/ui-new/Table/modules/vNodeMap'
import { extractColumnsFromSlots } from '~/ui-new/Table/modules/extractColumnsFromSlots'
import { renderCheckbox } from '~/ui-new/Table/modules/renderCheckbox'

export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    loader: {
      type: String,
      required: true,
      default: () => 'Loading...'
    }
  },

  setup(props, { slots }) {
    // Хранилище конфигурации колонок, полученных из слотов компонент(ов) Column
    const columns = ref([])

    const updateColumns = () => {
      columns.value = extractColumnsFromSlots(slots)
    }

    watch(
      () => slots.default?.(),
      () => updateColumns(),
      { deep: true }
    )

    onMounted(() => {
      updateColumns()
    })

    return () => {
      // loader
      if (!columns.value.length || !props.data.length) {
        return h('div', props.loader)
      }

      const headers = columns.value.map((col) =>
        col.selection ? renderCheckbox() : col.head
      )

      const rows = props.data.map((item) =>
        columns.value.map((col) =>
          col.selection ? renderCheckbox() : item[col.dataKey]
        )
      )

      return h('div', [
        vTable(vHead(headers), vBody(rows)),
        slots.default ? h('div', slots.default()) : null
      ])
    }
  }
}
