'use strict'
//引入webpack-merge插件，该插件是用来合并对象，也就是配置文件用的，相同的选项会被后者覆盖
const merge = require('webpack-merge')
//导入prod.wenv.js配置文件
const prodEnv = require('./prod.env')
//将两个配置对象合并，最终结果是NODE_ENV:'"development"'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
