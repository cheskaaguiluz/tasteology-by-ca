const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: "bundle.js",
    clean: true,
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[name][ext]' }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: "body" // Ensures <script> goes before </body>
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css" // Final combined CSS file
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
        { from: 'src/css', to: 'css' }, 
        { from: 'src/data', to: 'data' },
        { from: 'src/favicon.png', to: 'favicon.png' }
      ]
    })
  ],
  devServer: {
    static: path.join(__dirname, 'docs'),
    port: 3000,
    hot: true,
    open: true
  }
};
