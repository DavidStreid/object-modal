const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/modal-container.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.js'],
    },
    externals: {
        react: 'commonjs react',
        'react-dom': 'commonjs react-dom'
    },
};
