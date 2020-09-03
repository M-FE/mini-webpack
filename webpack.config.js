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
                        loader: resolve('./loaders/style-loader'),
                        // loader: 'style-loader',
                        options: {
                            attributes: {
                                id: 'style',
                                name: 'style'
                            },
                            insert: function(element) {
                                document.getElementById('app').appendChild(element);
                            }
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: resolve('./loaders/sass-loader'),
                        options: {
                            sassOptions: {
                                indentWidth: 8
                            }
                        }
                    }
                ]
            }
        ]
    }
};
