const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename:'[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // publicPath: '/',
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins:[
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: './index.html',
    //   title: 'Webpack 5 Boilerplate',
    //   meta: {
    //     viewport: 'width=device-width, initial-scale=1.0',
    //     description:'meta tag for SEO'
    //   }
    // }),
    new MiniCssExtractPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     { from: './public/assets', to: 'assets' },
    //   ],
    // }),
  ],
 
  resolve: {
    fallback: {
      "crypto": false,
      "fs": false,
      "stream": false,
      "zlib": false,
      "http": false,
      "net": false,
      "querystring": false,
      "url": true,
      "path": false,
      "buffer": false,
      "os": false,
      "assert": false,
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 300
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

