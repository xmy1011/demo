`npm i style-loader css-loader -D`
style-loader: 把解析后的 css 代码从 js 中抽离出来，放到头部的 style 标签中（在运行时做的）
css-loader: 解析 css 文件代码
`npm i less-loader less -D`
`less-loader`: 解析 less 文件代码，把 less 编译为 css
`less`: less 核心
`npm i babel-loader @babel/core @babel/preset-env core-js -D`
js 不断新增标准语法来方便开发，甚至还有非标准语法比如装饰器，极大提升代码可读性和开发效率。
但是 前者很多低版本浏览器不支持，后者所有的浏览器都不支持。
因此，需要把最新的标准语法转为低版本的语法，把非标准语法 转为 标准语法 。而 **_babel_** 是用来做这件事的。
`babel-loader`: 使用 babel 加载最新 js 代码 并将其转为 ES5
`@babel/core`: babel 编译的核心包
`@babel/preset-env`: babel 编译的预设，可以转换目前最新的 js 标准语法
`core-js`： 使用低版本 js 语法模拟高版本的库，也就是垫片。
`npm i @babel/plugin-proposal-decorators -D`
目前 js 标准语法是不支持装饰器的，
// 开启装饰器
"experimentalDecorators": true
babel.config.js 放在根目录下面
`npm i copy-webpack-plugin -D`
复制 public 文件夹 下的内容到构建出口文件夹中
`npm i @pmmmwh/react-refresh-webpack-plugin react-refresh -D`
配置 react 模块热更新
已经在 devServer 中 已经将 hot 设置为 true ， 在 webpack4 中，还需要在插件中添加 `HotModuleReplacementPlugin` 在 5 中，只要 devServer.hot 为 true 该插件就内置了
现在在开发模式下 修改 css 和 less 文件，页面样式可以在不刷新浏览器的情况下实时生效，这是因为 此时样式都在 style 标签里面，style-loader 做了替换样式的热替换功能。但是修改 tsx 浏览器会自动刷新后再显示修改后的内容，但是我们想要的是不是刷新浏览器，而是在不需要刷新浏览器的前提下 模块热更新，并且能够自动保留 react 的状态
`npm i speed-measure-webpack-plugin -D`
优化构建速度 当然优化的时候肯定要知道时间都花在哪里了，需要这个依赖。

#### 持久化存储缓存

webpack5 之前使用 babel-loader 缓存 js 解析结果，cache-loader 缓存 css 等资源解析结果。
还有模块缓存插件 hard-source-webpack-plugin 配置好缓存后第二次打包，通过对文件做哈希对比来验证
文件前后是否一致，如果一致则采用上一次的缓存，可以极大的节省时间。

webpack5 相较于 4 ，新增持久化缓存，改进缓存算法。
`npm i thread-loader -D`
  开启多线程 loader 极大提升 loader 的解析速度
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: ['thread-loader', 'babel-loader']
      }
    ]
}

#### 配置 alias 别名

  webpack 支持设置别名，设置别名可以让后续引用的地方减少路径的复杂度
  需要再 webpack.base.js 和 tsconfig 中设置
  配置修改完后，在项目中使用 @/xxx 就会指向 src/xxx, 在 js ts 和 css 文件中都可使用

#### 配置查找第三方库时只在本项目的 node_modules 中查找

  node 里面模块分为三种：
  node 核心模块
  node_modules 模块
#### DevTool
  eval inline hidden nosources cheap module

### 7 优化构建结果文件
  wepack-bundle-analyzer
  `npm install webpack-bundle-analyzer -D` 
#### 7.2 抽取 css 样式文件 方便配置缓存策略
  `npm i mini-css-extract-plugin -D`
#### 7.3 压缩css
  `npm i css-minimizer-webpack-plugin -D`
#### 7.4 由于第三方库的代码变化频率小 可以单独打包 利用浏览器缓存 公共的模块也可以提取出来 避免重复打包 加大代码体积
  webpack 提供了代码分割的功能 需要我们手动在优化项中配置代码分割
#### 7.9 资源懒加载 有效提升首屏加载速度
  webpack默认支持资源懒加载
#### 7.10 资源预加载
  上面配置了资源懒加载后,虽然提升了首屏渲染速度,但是加载到资源的时候会有一个去请求资源的延时,如果资源比较大会出现延迟卡顿现象
#### 7.11 打包时生成gzip文件
  前端代码在浏览器运行,需要从服务器把html,css,js资源下载执行,下载的资源体积越小,页面加载速度就会越快。一般会采用gzip压缩,现在大部分浏览器和服务器都支持gzip,可以有效减少静态资源文件大小,压缩率在 70% 左右。

  nginx可以配置gzip: on来开启压缩,但是只在nginx层面开启,会在每次请求资源时都对资源进行压缩,压缩文件会需要时间和占用服务器cpu资源，更好的方式是前端在打包的时候直接生成gzip资源,服务器接收到请求,可以直接把对应压缩好的gzip文件返回给浏览器,节省时间和cpu。
  `npm i compression-webpack-plugin -D`

https://juejin.cn/post/7111922283681153038
