var HtmlwebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var webpack = require('webpack')

module.exports ={
  entry:'./src/main.js',
  output:{
    path:'./dist',
    filename:'/build.js'
  },
  resolve: {
    extensions: ['','.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, 'src'),
      'comp': path.resolve(__dirname, 'src/components'),
      'img': path.resolve(__dirname, 'statics/images'),
      'kits': path.resolve(__dirname, 'src/kits')
    }
  },
  module:{
    //rules:[ //也可以使用rules代替loaders:[
    loaders:[ 
     {
          test: /\.vue$/,
          loaders: ['vue-loader']
        },
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /vue-preview.src.*?js$/,
          loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader', 'autoprefixer']
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'autoprefixer', 'less-loader']
      },
      // {
      //  test: /[\.jpg|\.png]$/, //这里有个bug：打包以后的路径有问题，浏览器访问不到图片
      //  loader: 'file-loader'//, //这里如果配置成 loaders:[] 则query参数会找不到
      //  // query: {
      //            name: '[name].[ext]?[hash]'
      //          }
      // }, 
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
          test: /\.(png|jpg)$/,
          loader: 'url?limit=261564' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      }
    ]
  },
  devServer: {
    //true：能保证浏览器历史记录能够被浏览，但是webpack打包时间会慢一些
    //如果设置成false，则刷新提示页面找不到，webpack打包时间会快
    historyApiFallback: true,
    noInfo: true
  },
    babel: {  
      presets: ['es2015'],  
      plugins: ['transform-runtime']  
    },
   //添加我们的插件 会自动生成一个html文件
    plugins: [
      new HtmlwebpackPlugin({
        title: 'index',
        filename: 'index.html',
        template: 'index.html'
      })
    ]
}
