var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    'app': './src/main.ts',
    'vendor': './src/vendor.ts',
    'polyfills': [
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone'
    ]
  },
  output: {
    path: './views',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.component.ts$/, loader: 'ts!angular2-template'},
      {test: /\.ts$/, exclude: /\.component.ts$/, loader: 'ts'},
      {test: /\.html$/, loader: 'raw'},
     // {test: /\.(jpe?g|jpg|png|gif|svg)$/i, loader: "file-loader?name=/public/icons/[name].[ext]"},
     /* {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader?limit=1024&name=assets.fonts/[name]'
      },*/
     {test: /\.css$/, loader: 'raw'}
     //{test: /\css$/, loader: 'style!css!file-loader?name=assets/css/common.css', options: { minimize: true } }      
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },
  plugins: [
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  watch: true
  
};
