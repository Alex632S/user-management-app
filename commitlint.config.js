export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci'
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'user',
        'group',
        'policy',
        'session',
        'audit',
        'api',
        'ui',
        'store',
        'types',
        'config',
        'ci',
        'deps',
        'husky'
      ]
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ]
  }
}
