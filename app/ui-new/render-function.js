import { ref, h, onMounted } from 'vue'

const vNodeMap = {
  table: function (thead, tbody, tConfig = null) {
    return h('table', tConfig, [thead, tbody])
  },

  tr: function (trCell, trConfig = null) {
    return h('tr', trConfig, trCell)
  },

  head: function (thCell = [], theadConfig = null, thConfig = null) {
    return h('thead', theadConfig, [
      this.tr(
        thCell.map((thInner) => {
          return h('th', thConfig, thInner)
        })
      )
    ])
  },

  body: function (tdCell = [], tbodyConfig = null, tdConfig = null) {
    return h(
      'tbody',
      tbodyConfig,
      tdCell.map((tItem) => {
        return this.tr(
          tItem.map((tdValue) => {
            return h('td', tdConfig, tdValue)
          })
        )
      })
    )
  }
}

const vTable = vNodeMap.table.bind(vNodeMap)
const vHead = vNodeMap.head.bind(vNodeMap)
const vBody = vNodeMap.body.bind(vNodeMap)

export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  setup(props, { slots }) {
    const columns = ref([])

    const extractColumnsFromSlots = () => {
      const slotChildren = slots.default?.()

      if (!slotChildren) return

      columns.value = slotChildren
        .filter((vnode) => vnode.type?.name === 'Column')
        .map((vnode) => ({
          head: vnode.props?.head || '',
          key: vnode.props?.key || ''
        }))
        .filter((column) => column.key)
    }

    watch(
      () => slots.default?.(),
      () => {
        extractColumnsFromSlots()
      },
      { deep: true }
    )

    onMounted(() => {
      extractColumnsFromSlots()
    })

    return () => {
      if (!columns.value.length || !props.data.length) {
        return h('div', 'Loading...')
      }
      const headers = columns.value.map((col) => col.head)

      const rows = props.data.map((item) =>
        columns.value.map((col) => item[col.key])
      )

      return h('div', [
        vTable(vHead(headers), vBody(rows)),
        slots.default ? h('div', slots.default()) : null
      ])
    }
  }
}
