const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    watch: NODE_ENV === 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['npm run run:dev']
        })
    ],
    externals: [ nodeExternals() ]
};
