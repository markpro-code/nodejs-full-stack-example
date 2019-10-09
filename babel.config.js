module.exports = function (api) {
    api.cache(true)

    return {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    forceAllTransforms: true,
                    useBuiltIns: 'entry',
                    corejs: '2',
                },
            ],
        ],

        plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-object-assign',
            '@babel/plugin-syntax-dynamic-import',
            [
                'import',
                {
                    libraryName: 'lodash',
                    camel2DashComponentName: false,
                    libraryDirectory: '',
                    style: false,
                },
                'lodash',
            ],
            [
                'import',
                {
                    libraryName: 'antd',
                    style: 'css',
                },
                'antd',
            ],
            'react-hot-loader/babel',
        ],
    }
}
