const path = require('path');

const resolve = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
    entry: resolve('./demo/main.js'),

    output: {
        filename: 'bundle.js',
        path: resolve('./dist')
    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: resolve('./bin/style-loader.js')
                    },
                    'css-loader'
                ]
            }
        ]
    }
};
