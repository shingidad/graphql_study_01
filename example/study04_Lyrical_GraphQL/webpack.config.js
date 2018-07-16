
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    NODE_ENV: mode,
    PUBLIC: path,
} = process.env;

module.exports = {
    mode,
    entry: './client/index.js',
    output: {
        path,
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
};