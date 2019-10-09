/* .eslintrc.js */
module.exports = {
    extends: 'airbnb',
    env: {
        browser: true,
        commonjs: true,
        amd: true,
        es6: true,
    },
    parser: 'babel-eslint',
    globals: {
        '$namespace': 'readonly'
    },
    rules: {
        'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-indent': [2, 4],
        'react/forbid-prop-types': ['error', { forbid: ['any'] }],
        'react/jsx-boolean-value': [2, 'always'],
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-no-bind': 0,
        'react/jsx-wrap-multilines': 0,
        'react/no-array-index-key': 0,
        'react/no-multi-comp': 0,
        'react/destructuring-assignment': 0,
        'react/prefer-stateless-function': 0,
        'react/sort-comp': 0,
        'react/prop-types': [
            'error',
            {
                ignore: ['dispatch', 'params', 'children', 'router', 'location', 'routeParams', 'routes', 'history', 'route', 'match', 'form', 'commons', 'data'],
                skipUndeclared: true,
            }
        ],

        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/extensions': 'ignorePackages',
        'import/prefer-default-export': 0,


        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/mouse-events-have-key-events': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/media-has-caption': 0,
        'jsx-a11y/anchor-is-valid': ['error', {
            components: ['Link'],
            specialLink: ['to'],
            aspects: []
        }],

        'arrow-parens': [2, 'as-needed'],
        'class-methods-use-this': 0,
        'consistent-return': 0,
        'eslint-plugin-jsx-a11y/no-static-element-interactions': 0,
        'function-paren-newline': 1,
        'global-require': 0,
        // 'key-spacing': ["error", { "multiLine": { "beforeColon": false, "afterColon": true }, "align": { "beforeColon": true, "afterColon": false, "on": "colon" } }],
        'linebreak-style': 0,
        'max-len': ['error', { code: 180 }],
        'no-case-declarations': 1,
        'no-cond-assign': 0,
        'no-continue': 0,
        'no-multi-assign': 0,
        'no-multi-spaces': ['error', { exceptions: { 'ImportDeclaration': true } }],
        'no-param-reassign': 'warn',
        'no-script-url': 0,
        'no-underscore-dangle': 0,
        'no-unused-vars': ['error', { 'args': 'none' }],
        'no-void': 0,
        'object-curly-newline': 0,
        'prefer-arrow-callback': 0,
        'prefer-promise-reject-errors': 0,
        'newline-per-chained-call': 0,
        indent: [2, 4],
        semi: [2, 'never'],

    }
}
