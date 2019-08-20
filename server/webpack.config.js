const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    target: 'node',
    externals: [nodeExternals()],

    entry: ['babel-polyfill', './src/index.js'],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            utils: path.resolve(__dirname, 'src/utils/'),
            modules: path.resolve(__dirname, 'src/modules/'),
            user: path.resolve(__dirname, 'src/modules/user/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: path.resolve(__dirname, ''),
            verbose: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
