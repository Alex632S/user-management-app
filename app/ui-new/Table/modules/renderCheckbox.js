import { h } from 'vue'

/**
 * Рендерит заголовок с чекбоксом для selection колонки
 */
export const renderCheckbox = () => {
  return h('input', {
    type: 'checkbox',
    checked: false,
    onChange: (event) => {
      if (event.target.checked) {
        console.log('checked')
      } else {
        console.log('unchecked')
      }
    }
  })
}
