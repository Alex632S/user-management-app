import { h } from 'vue'

/**
 * Фабрика для создания VNode таблицы
 */
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

export default vNodeMap

// Адаптеры для vNodeMap
export const vTable = vNodeMap.table.bind(vNodeMap)
export const vHead = vNodeMap.head.bind(vNodeMap)
export const vBody = vNodeMap.body.bind(vNodeMap)
