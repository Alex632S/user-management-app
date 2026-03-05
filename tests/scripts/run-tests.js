import { execSync } from 'child_process'
import fs from 'fs'

const IGNORED_PATTERNS = [
  'commitlint.config.js',
  'nuxt.config.ts',
  '*.config.js',
  'scripts/',
  'tests/scripts/'
]

try {
  const changedFiles = execSync(
    'git diff --cached --name-only --diff-filter=ACMR'
  )
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean)

  if (changedFiles.length === 0) {
    console.log('📝 Нет измененных файлов для тестирования')
    process.exit(0)
  }

  const testableFiles = changedFiles.filter(
    (file) =>
      file.match(/\.(js|ts|vue)$/) &&
      !file.match(/\.test\.|\.spec\.|tests\//) &&
      !IGNORED_PATTERNS.some(
        (pattern) => file.includes(pattern) || file.match(new RegExp(pattern))
      ) &&
      fs.existsSync(file)
  )

  if (testableFiles.length === 0) {
    console.log('🧪 Нет файлов, требующих запуска тестов')
    process.exit(0)
  }

  console.log(`📦 Найдено ${testableFiles.length} файлов для тестирования:`)
  testableFiles.forEach((file) => console.log(`  - ${file}`))

  // Запускаем тесты для измененных файлов
  console.log('\n🧪 Запуск тестов...')
  execSync(`npx vitest related --run ${testableFiles.join(' ')}`, {
    stdio: 'inherit'
  })

  console.log('✅ Все тесты пройдены успешно!')
} catch (error) {
  console.error('❌ Ошибка при запуске тестов:', error.message)
  process.exit(1)
}
