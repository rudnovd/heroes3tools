// https://commitlint.js.org/#/reference-rules

module.exports = {
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [0, 'never'],
    'subject-empty': [0, 'always'],
    'subject-full-stop': [2, 'never', '.'],
    'header-case': [0, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
}
