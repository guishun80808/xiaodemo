// 自动生成HTML页面插件
var htmlwp = require('html-webpack-plugin');

// 抽取css文件插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/main.js'),// 项目入口文件
    // 需要分离的第三方包名写在数组中
    vendors: ['vue', 'vue-resource', 'vue-router', 'vuex', 'mint-ui', 'moment', 'vue-preview']
  },
  output: {
    path: __dirname + '/dist',  // 注意：webpack1.14.0 要求这个路径是一个绝对路径
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,  //打包 .css文件
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,  //打包 .scss文件
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.less/,  //打包 .less文件
        loader: 'style-loader!css-loader!less-loader'
      }
      ,
      {
        test: /\.(png|jpg|gif|ttf|svg)$/,  //打包 url请求的资源文件
        loader: 'url-loader?limit=20000' //limit表示图片的大小为20K是临界值，小于20K的图片均被打包到build.js中去，请求图片就会很快
      },
      {
        test: /\.js$/,  // 将.js文件中的es6语法转成es5语法
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.vue$/,  // 解析 .vue 组件页面文件
        loader: 'vue-loader' //
      },
      {
        test: /vue-preview.src.*?js$/,  // vue-preivew组件专用
        loader: 'babel-loader'
      }
    ]
  },
  babel: {
    presets: ['es2015'],  // 配置将es6语法转换成es5语法
    plugins: ['transform-runtime']
  },
  plugins: [
    // 自动生成HTML页面
    new htmlwp({
      title: '首页',  //生成的页面标题<head><title>首页</title></head>
      filename: 'index.html', //webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部，才能实现自动刷新功能
      template: 'template.html', //根据index1.html这个模板来生成(这个文件请程序员自己生成)
      minify: {
        // 删除注释
        removeComments: true,
        // 删除空格
        collapseWhitespace: true,
        // 删除空格缩进
        removeAttributeQuotes: true
      }
    }),
    // 抽取css文件
    new ExtractTextPlugin('app.css'),

    // 分离第三方包插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 根据入口文件中vendors分离对应的第三方包
      filename: 'vendors.js' // 生成一个vendor.js文件
    }),

    // js代码压缩
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    }),

    // 删除警告
    new webpack.DefinePlugin({
      'process.env': {
        // 注意字符串被引号引起来
        NODE_ENV: '"production"'
      }
    })
  ]
}