/**
 * Извлекает конфигурацию колонок из слотов компонента Table
 * Ищет дочерние компоненты с именем 'Column' и собирает их props
 * @param {Object} slots - Объект слотов Vue компонента
 * @param {Function} slots.default - Функция, возвращающая дочерние VNode, переданные в слот по умолчанию
 *
 */
export const extractColumnsFromSlots = (slots) => {
  const slotChildren = slots.default?.()

  if (!slotChildren) return

  return slotChildren
    .filter((vnode) => vnode.type?.name === 'Column')
    .map((vnode) => ({
      head: vnode.props?.head || '',
      dataKey: vnode.props?.dataKey || '',
      selection: vnode.props?.selection
    }))
    .filter((column) => {
      if (column.selection) return true
      return column.dataKey
    })
}
