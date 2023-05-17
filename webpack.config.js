const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean:true,
        filename: 'main.js',
        publicPath:'/'
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader:'html-loader'
                }
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
             new HtmlMinimizerPlugin({
              minify: HtmlMinimizerPlugin.swcMinify,
              minimizerOptions: {}
            })

        ]

    }
}

