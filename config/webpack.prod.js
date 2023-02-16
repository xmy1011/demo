const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式 开启tree-shaking 和压缩代码，以及其他优化
  plugins:[
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),// 复制public 下面的文件
          to: path.resolve(__dirname, '../dist'),//复制到 dist 目录
          filter: source => {
            return !source.includes('index.html'); // 忽略掉 index.html
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css' //抽离css 输出目录
    }),

  ],
  
  // 
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), //压缩css
      new TerserPlugin({
        parallel: true,
        terserOptions:{
          compress:{
            pure_funcs: ["console.log"] //删除log
          }
        }
      })
    ],
    // 代码分割
    splitChunks: {
      cacheGroups: {
        vendors: { // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: { // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        }
      }
    }
  },

})