module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    globals: {
        process: true
    },
    parserOptions: {
        ecmaVersion: 2021, // 2021
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1, MemberExpression: 0 }], /* 4个空格缩进 */
        'no-eval': 'off',
        'no-extend-native': 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'vue/no-mutating-props': 0,
        'vue/valid-v-bind-sync': 'off',
        'vue/html-indent': ['error', 4], /* 关闭html缩进 */
        'vue/html-self-closing': 'off', /* 关闭自闭合 */
        'vue/max-attributes-per-line': 'off', /* 关闭强制换行 */
        'object-property-newline': 'off', /* 关闭对象导入强制换行 */
        'vue/multi-word-component-names': 'off', /* 关闭检查组件名是否单词或驼峰, 组件名可为单独一个词语，故关闭此功能 */
        'vue/no-reserved-component-names': 'off', /* 防止 Vue 组件与标准 HTML 元素和内置组件之间的名称冲突, 组件所有名称均为大 */
        complexity: 'off'
    }
}
