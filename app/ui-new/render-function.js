import { ref, h, onMounted } from 'vue'

const vNodeMap = {
  /**
   * Создаёт VNode таблицы
   * @param {Object} thead - VNode заголовка (thead)
   * @param {Object} tbody - VNode тела (tbody)
   * @param {Object|null} tConfig - дополнительные атрибуты таблицы
   */
  table: function (thead, tbody, tConfig = null) {
    return h('table', tConfig, [thead, tbody])
  },

  /**
   * Создаёт VNode строки таблицы
   * @param {Array} trCell - массив VNode ячеек (th/td)
   * @param {Object|null} trConfig - атрибуты строки
   */
  tr: function (trCell, trConfig = null) {
    return h('tr', trConfig, trCell)
  },

  /**
   * Создаёт VNode заголовка таблицы (thead) с колонками (th)
   * @param {Array} thCell - массив заголовков колонок
   * @param {Object|null} theadConfig - атрибуты thead
   * @param {Object|null} thConfig - атрибуты каждой ячейки th
   */
  head: function (thCell = [], theadConfig = null, thConfig = null) {
    return h('thead', theadConfig, [
      this.tr(
        thCell.map((thInner) => {
          return h('th', thConfig, thInner)
        })
      )
    ])
  },

  /**
   * Создаёт VNode тела таблицы (tbody) со строками данных
   * @param {Array} tdCell - двумерный массив данных для ячеек
   * @param {Object|null} tbodyConfig - атрибуты tbody
   * @param {Object|null} tdConfig - атрибуты каждой ячейки td
   */
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

// Адаптеры для vNodeMap
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
    },
    loader: {
      type: String,
      required: true,
      default: () => 'Loading...'
    }
  },

  setup(props, { slots }) {
    // Хранилище конфигурации колонок, полученных из слотов
    const columns = ref([])

    /**
     * Извлекает конфигурацию колонок из слотов
     * Ищет дочерние компоненты с именем 'Column' и собирает их props
     */
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
        return h('div', props.loader)
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
