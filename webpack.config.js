const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    filename:'src/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:"./public/index.html",
      filename: 'public/index.html',
    }),
    new HtmlWebpackPlugin({
      template:"./public/search.html",
      filename: 'public/search.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'css', // Source directory
          to: 'css',   // Destination directory in 'dist'
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  
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
 
  resolve: {
    fallback: {
      "crypto": false,
      "fs": false,
      "stream": false,
      "zlib": false,
      "http": false,
      "net": false,
      "querystring": false,
      "url": false,
      "path": false,
      "buffer": false,
      "os": false,
      "assert": false,
      "async_hooks": false

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

