const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"),  // 入口文件 ，
  // 打包文件出口
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出 js 的名称，
    path: path.join(__dirname, "../dist"), // 打包结果输出路径，
    clean: true, // webpack4 需要配置 clean-webpack-plugin 来删除dist 文件，webpack5 内置了，
    publicPath: '/' // 打包后文件的公共前缀路径
  },

  /**
   * (1) 由于 webpack 默认只能识别 js 文件，不能识别 jsx 语法，需要配置 loader 的预设 @babel/preset-typescript 
   * 来将 ts 语法先转为 js语法，在借助 预设 @babel/preset-react 来识别 jsx 语法。
   * （2）安装 babel 核心模块 和 babel 预设 
   * **/

  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')], //只对ts tsx 进行loader 解析
        test: /.(ts|tsx)$/, // 匹配 ts tsx
        use: 'babel-loader'
      },
      {
        test: /.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /.less$/, // 匹配less
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,// 小于 10kb 转 base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8].[ext]', // 输出文件目录和名字
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,// 小于 10kb 转 base64位
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8].[ext]', // 输出文件目录和名字
        }
      },
      {
        test: /.(mp4|wembm|ogg|mp3|wav|flac|aac)$/, //匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,// 小于 10kb 转 base64位
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8].[ext]', // 输出文件目录和名字
        }
      }

    ]
  },

  // extension 是 webpack 的 resolve 解析配置下的选项，在引入模块时不带后缀时，会来该配置数组里面依次添加后缀查找文件
  // 因为 ts 不支持引入，.ts .tsx为后缀的文件，所以要在 extensions 中配置，而第三方库里面有很多引入js文件没有带后缀，所以也要配置下js
  // 注意 把 高频配置的文件后缀 放前面
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules')], //查找第三方模块只在本项目的node_modules中查找
  },
  //  webpack 需要把最终构建好的静态资源 都引入到一个html文件里面，这样浏览器才能运行，html-webpack-plugin 就是来做这种事情的 安装依赖
  //  因为插件在在开发和构建打包模式都会用到，所以还是放在公共文件配置里面
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), //模板取定义root节点的模板 ，
      inject: true, // 自动注入静态资源
    }),
    //  把环境变量注入到代码中 使其可用 不设置这个只能在代码中使用 NODE_ENV 无法使用 BASE_ENV
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),

  ],

  // 缓存 之前 11517 ms 之后：7189 ms 缓存的存储位置： node_modules/.cache/webpack里面
  cache: {
    type: 'filesystem', // 使用文件缓存
  }
}
// 在package.json的命令中配置是为了能在webpack中获取变量
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("BASE_ENV", process.env.BASE_ENV);
