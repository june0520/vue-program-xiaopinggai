'use strict'
//引入node.js路径模块
const path = require('path')
//引入config目录下的index.js配置文件
const config = require('../config')
//引入extract-text-webpack-plugin插件，用来将css提取到单独的css文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
//exports其实就是一个对象，用来导出方法的，最终还是使用module.exports,此处导出assetsPath
exports.assetsPath = function (_path) {
  // 如果是生产环境assetsSubDirectory就是'static'，否则还是'static'，哈哈哈
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
 // path.join和path.posix.join的区别就是，前者返回的是完整的路径，后者返回的是完整路径的相对根路径
 // 也就是说path.join的路径是C:a/a/b/xiangmu/b，那么path.posix.join就是b
  return path.posix.join(assetsSubDirectory, _path)
  //所以这个方法返回的就是一个干净的相对根路径
}
//下面是导出cssLoaders的相关配置
exports.cssLoaders = function (options) {
  // options如果不为null或者undefined，0，""等等就原样，否则就是{}。
  //在js里面,||运算符，A||B，A如果为真，直接返回A。如果为假，直接返回B（不会判断B是什么类型）
  options = options || {}

  const cssLoader = {
    //cssloader的基本配置
    loader: 'css-loader',
    //options是用来传递参数给loader的
    options: {
      //是否开启cssmap,默认是false
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    //将上面的基础cssloader配置放到一个数组里面
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
//如果该函数传递了单独的loader就加到loaders数组里面 ，这个loader可能是less,sass 之类的 
    if (loader) {
//加载对应的Loader
      loaders.push({
        loader: loader + '-loader',
        //Object.assign是ES6的方法，主要用来合并对象的，浅拷贝
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
    // 注意这个extract是自定义的属性，可以定义在options里面，
    //主要作用就是当配置为true就把文件单独提取，false表示不单独提取，这个可以在使用的时候单独配置，瞬间觉得vue作者好牛逼
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        // publicPath:'../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
    //以上这段代码就是用来返回最终读取和导入的loader,来处理对应类型的文件
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),//css对应vue-style-loader和css-loader
    postcss: generateLoaders(),//postcss对应vue-style-loader和css-loader
    less: generateLoaders('less'),//less 对应vue-style-loader和less-loader
    sass: generateLoaders('sass', { indentedSyntax: true }),//less 对应vue-style-loader和sass-loader
    scss: generateLoaders('sass'),// scss对应 vue-style-loader 和 sass-loader
    stylus: generateLoaders('stylus'),// stylus对应 vue-style-loader 和 stylus-loader
    styl: generateLoaders('stylus')// styl对应 vue-style-loader 和 styl-loader
  }
}

// Generate loaders for standalone style files (outside of .vue)
//下面这个主要处理import这种方式导入的文件类型的打包，上面的exports.cssLoaders是为这一步服务的
exports.styleLoaders = function (options) {
  const output = []
  //下面就是生成的各种css文件的loader对象
  const loaders = exports.cssLoaders(options)
//把每一种文件的loader都提取出来
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      //把最终的结果都push到output数组中，大事搞定
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
