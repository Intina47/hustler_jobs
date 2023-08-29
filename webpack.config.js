const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {

  entry: {
    main: './public/src/client-keJobsDisplay.js',
    searchKe: './public/src/search_Ke.js',
    darkMode: './public/src/darkMode.js',
    conditionalJobsDisplay: './public/src/conditional_jobsDisplay.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'dist')
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body'
    })
    // new CleanWebpackPlugin()
  ],
};


// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");
// // var contents = require("config") // will load config.cson

// module.exports = {
//   entry: {
//     main: './index.js'
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//       filename: 'index.html', 
//     }),
//     new HtmlWebpackPlugin({
//       template: "./public/search.html",
//       filename: 'search.html', 
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: 'public/css', // Source directory
//           to: 'css',   // Destination directory in 'dist'
//         },
//         // assets
//         {
//           from: './public/assets/pdf_files', // Source directory
//           to: 'pdf_files',   // Destination directory in 'dist'
//         },
//         {
//           context: path.resolve(__dirname, "public"),
//           from: "./assets/*.json",
//           to: "[name].[ext]",
//         },
//       ],
//     }),

//     new MiniCssExtractPlugin({
//       filename: '[name].css'
//     })
//   ],
//   module: {
//     rules: [
//     {
//       test: /\.json$/i,
//       type: "asset/resource",
//     },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       },
//       {
//         test: /\.css$/,
//         use: [MiniCssExtractPlugin.loader, 'css-loader']
//       },
//     ]
//   },
//   resolve: {
//       fallback: {
//       "crypto": false,
//       "fs": false,
//       "stream": false,
//       "zlib": false,
//       "http": false,
//       "net": false,
//       "querystring": false,
//       "url": false,
//       "path": false,
//       "buffer": false,
//       "os": false,
//       "assert": false,
//       "async_hooks": false,
//       "express": false,
//     }
//   },
//   devServer: {
//     contentBase: path.join(__dirname, 'public'),
//     compress: true,
//     port: 3000
//   },  
//   mode: 'production',
//   optimization: {
//     splitChunks: {
//       chunks: 'all'
//     }
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
//       // `...`
//       new JsonMinimizerPlugin(),
//     ],
//   },
// };