module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    dayjs: true,
    VueRouter: true,
    Vue: true,
    ELEMENT: true,
    Vuex: true,
    axios: true,
    lodash: true,
    Mock: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        // 此处config对应webpack.config.js的路径，我这个路径是vue-cli3默认的路径
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
  rules: {
    'no-unused-expressions': 'off', // 禁止未使用过的表达式 (no-unused-expressions)
    'dot-notation': 'off', // 要求使用点号 (dot-notation) ojb['xxx']
    'no-trailing-spaces': 'off', // 禁用行尾空白
    'no-restricted-syntax': 'off', // 禁止使用特定的语法
    'import/extensions': [2, 'never', { js: 'never', json: 'never' }],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'import/no-unresolved': [2, { ignore: ['vuex'] }],
    'import/no-cycle': 0,
    'prefer-destructuring': 'off', // 优先使用数组和对象解构
    'no-continue': 'off',
    'no-underscore-dangle': 'off', // 禁止标识符中有悬空下划线
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-multi-assign': 'off',
    'no-console': 'off',
    'max-len': ['error', { code: 120 }],
    semi: ['warn', 'never'],
    indent: ['warn', 2],
    'no-param-reassign': 'off',
    // 'vue/script-indent': ['error', 2, { baseIndent: 1 }],
  },
  overrides: [{ files: ['*.vue'], rules: { indent: 'off' } }],
}
// eslint-disable-line
/* eslint-disable */
