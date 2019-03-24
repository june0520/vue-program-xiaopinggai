'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// path是node.js的路径模块，用来处理路径统一的问题
const path = require('path')

module.exports = {
  dev: {

    // Paths
    //下面定义的是静态资源根目录的子目录static,也就是dist目录下面的static
    assetsSubDirectory: 'static',
    //下面定义的是静态资源的公开路径，也就是真正的引用路径
    assetsPublicPath: '/',
    // 下面是代理表，作用是用来，建一个虚拟api服务器用来代理本机的请求，只能用于开发模式
    //vue-cli使用这个功能是借助http-proxy-middleware插件，一般解决跨域请求api
    //   proxyTable: {
    //     '/list': {
    //         target: 'http://api.xxxxxxxx.com', -> 目标url地址
    //         changeOrigin: true, -> 指示是否跨域
    //         pathRewrite: {
    //         '^/list': '/list' -> 可以使用 /list 等价于 api.xxxxxxxx.com/list
    //         }
    //     }
    // }
    // assetsPublicPath:'./',
    proxyTable: {
      '/api': {
        target: 'http://api.qingyunke.com', //设置调用接口域名和端口号别忘了加http
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
                // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
        }
      }
    },


    // Various Dev Server settings
    host: '192.168.199.143', // can be overwritten by process.env.HOST
    //下面是dev-server的端口号，可自行修改
    port: 9999, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    //下面表示是否自定代开浏览器
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
//下面是build也就是生产编译环境下的一些配置
  build: {
    // Template for index.html
    //下面是相对路径的拼接，假如当前根目录是config,那么下面的配置的index属性值就是dist/index.html
    //path.resolve()方法会把一个路径或路径片段序列解析为一个绝对路径
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    //下面定义的是静态资源的根目录，也就是dist目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    //下面定义的是静态资源根目录的子目录static,也就是dist目录下面的static
    assetsSubDirectory: 'static',
    //下面定义的是静态资源的公开路径，也就是真正的引用路径
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    //下面定义是否生成生产环境的sourceMap,sourceMap是用来debug编译后的文件，通过映射到编译前文件来实现
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    //下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
    productionGzip: false,
    //定义要压缩哪些类型的文件
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    //下面是用来开启编译完成后的报告，可以通过设置值为true和false来开始或关闭
    //下面的process.env.npm_config_report 表示定义的一个npm_config_report环境变量，可自行设置
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
