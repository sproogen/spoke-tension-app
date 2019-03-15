const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const src = path.resolve(__dirname, 'src')
const publicSrc = path.resolve(src, 'public')
const publicOutput = path.resolve(__dirname, 'public')

module.exports = (env) => {
  const analyse = env ? env.analyse : false

  return {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: publicOutput,
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 0,
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: publicSrc },
      ]),
      new HtmlWebpackPlugin({
        template: path.resolve(publicSrc, 'index.html'),
      }),
      new MiniCssExtractPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: analyse ? 'server' : 'disabled',
      }),
    ],
    devServer: {
      contentBase: './public',
      hot: true,
    },
  }
}
