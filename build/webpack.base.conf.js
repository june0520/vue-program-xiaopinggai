'use strict'
const path = require('path')
//引入utils工具模块，主要用来处理css-loaser和vue-style-loader的
const utils = require('./utils')
//引入config目录下的index.js配置文件，主要用来定义一些开发和生成环境的属性
const config = require('../config')
//vue-loader.conf配置文件是用来解决各种css文件的，定义了诸如css,less,scss 之类的和样式有关的loader
const vueLoaderConfig = require('./vue-loader.conf')
//返回dir为止的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    // 路径是config目录下的index.js中的build配置中的assetsRoot，也就是dist目录
    path: config.build.assetsRoot,
    filename: '[name].js',//name就是入口文件的前面的key值，
    //资源发布路径，//上线路径，也就是真正的文件引用路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // resolve是webpack的内置选项，也就是说当使用 import "jquery"，该如何去执行这件事 
  // 情就是resolve配置项要做的，import jQuery from "./additional/dist/js/jquery" 这样会很麻烦，可以起个别名简化操作
  resolve: {
    extensions: ['.js', '.vue', '.json'],// 省略扩展名，也就是说.js,.vue,.json文件导入可以省略后缀名，这会覆盖默认的配置，所以要省略扩展名在这里一定要写上
    alias: {
      //我的理解是此处指定别名  require('vue/dist/vue.esm.js') 可以简化为require（'vue$'）
      // resolve('src') 其实在这里就是项目根目录中的src目录，使用 import somejs from "@/some.js" 就可以导入指定文件，是不是很高大上
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  //用来解析不同的模块
  module: {
    rules: [
      {
        test: /\.vue$/,// 对vue文件使用vue-loader，该loader是vue单文件组件的实现核心，专门用来解析.vue文件的
        loader: 'vue-loader',
        options: vueLoaderConfig// 将vueLoaderConfig当做参数传递给vue-loader,就可以解析文件中的css相关文件
      },
      {
        test: /\.js$/,// 对js文件使用babel-loader转码,该插件是用来解析es6等代码
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]// 指明src和test目录下的js文件要使用该loader
      },
      {
        // 对图片相关的文件使用 url-loader 插件，这个插件的作用是将一个足够小的文件生成一个64位的DataURL 
        // 可能有些老铁还不知道 DataURL 是啥，当一个图片足够小，为了避免单独请求可以把图片的二进制代码变成64位的 
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,　　　　// 限制 10000 个字节以下转base64，以上不转
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
