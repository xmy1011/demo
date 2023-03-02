const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

//  合并公共配置 并添加开发环境配置

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 源代码调试模式
  devServer: {
    port: 3000,
    compress: false, //gzip 压缩， 开发环境不开启，提升热更新速度。
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决 history 路由 404
    static: {
      directory: path.join(__dirname, "../public"), // 托管静态资源pubic 文件夹
    },
    proxy: {
      '/api':{
        target: 'http://localhost:8080',
        // target: 'https://www.fastmock.site/mock/eade0b947aad4f1f8ec235724800d8fa',
        // target: 'https://mock.mengxuegu.com/mock/62abda3212c1416424630a45',
        changeOrigin: true, 
        pathRewrite: { '^/api': '' },
      }
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
  devtool: 'eval-cheap-module-source-map',
})