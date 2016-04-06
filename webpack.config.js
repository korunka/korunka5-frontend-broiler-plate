/*
 * Konfigurace Webpacku
 *
 * TODO: move to configs directory
 * TODO: determine which config to use: DEV/TEST/PROD
 * TODO: set different paths for client/backoffice/api and include shared dir
 */


const webpack = require('webpack');
const path = require('path');


// require all the needed Webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;


// setup the default webpack config
var webpackConfig = {

  debug : true,


  devtool : 'cheap-module-eval-sourcemap',


  // Entry point to the bundle - our application
  entry : {
    'polyfills' : path.join(__dirname, 'src', 'client', 'polyfills.ts'),
    'vendor'    : path.join(__dirname, 'src', 'client', 'vendor.ts'),
    'main'      : path.join(__dirname, 'src', 'client', 'main.ts')
  },


  // Options affecting the resolving of modules.
  // See: http://webpack.github.io/docs/configuration.html#resolve
  resolve : {

    // Contains directories with our modules
    // See: https://webpack.github.io/docs/configuration.html#resolve-root
    root : [path.join(__dirname, 'src', 'client')],

    // Array of filename extensions that will be used to resolve modules.
    // E.g.: To be able to use require('vetrnik') to load vetrnik.js, one has to specify '.js'
    // See: http://webpack.github.io/docs/configuration.html#resolve
    extensions : ['', '.ts', '.js']

  },


  // Options affecting the output of the compilation.
  // See: http://webpack.github.io/docs/configuration.html#output
  output : {

    path              : path.join(__dirname, 'dist', 'client'), // Output directory as an absolute path (required)
    filename          : '[name].bundle.js', // Specifies the name of each output file on disk.
    sourceMapFilename : '[name].map', // The filename of the SourceMaps for the JavaScript files.
    chunkFileName     : '[id].chunk.js' // The filename of non-entry chunks.

  },


  // Options affecting the normal modules
  // See: http://webpack.github.io/docs/configuration.html#module
  module : {

    // An array of automatically applied loaders.
    loaders : [

      // TypeScript loader support for .ts
      // See: https://github.com/s-panferov/awesome-typescript-loader
      {
        test    : /\.ts$/,
        loader  : 'awesome-typescript-loader',
        exclude : [/\.(spec|e2e)\.ts$]/]
      },

      // SASS Loader for .scss files
      // See: https://github.com/jtangelder/sass-loader
      {
        test    : /\.scss$/,
        loaders : ['raw', 'sass']
      },

      // CSS Loader for .css files
      // See: https://github.com/webpack/css-loader
      {
        test    : /\.css$/,
        loaders : ['style', 'css']
      },

      // HTML loader support for *.html files
      // Returns file contents as a string. Resolves all `src="..."` attributes
      // as `require('...')`
      // Needed to load Angular2 templates.
      // See: https://github.com/webpack/html-loader
      {
        test    : /\.html$/,
        loader  : 'html-loader',
        exclude : ['./src/client/index.html']
      },

      // File loader for JPGs and PNGs
      // Files under 8kB will be encoded inline.
      // See: https://github.com/webpack/url-loader
      {
        test   : /\.(jpe?g|png|gif|svg)$/,
        loader : 'url-loader',
        query  : { limit : '8192' }
      },

      // copy those assets to output
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
        query: { name : 'fonts/[name].[hash].[ext]?'}
      }
      
    ]

  },


  // Adding additional plugins to the compiler.
  plugins : [

    // ## ForkCheckerPlugin
    // Description: Do type checking in a separate process, so webpack don't need to wait.
    // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
    new ForkCheckerPlugin(),

    // Plugin: CommonsChunkPlugin
    // Description: Shares common code between the pages.
    // It identifies common modules and puts them into a commons chunk.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({
      name      : ['main', 'vendor', 'polyfills'],
      minChunks : Infinity
    }),


    // ## HtmlWebpackPlugin
    // Simplifies the creation of HTML file to serve the webpack bundles.
    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template      : path.join(__dirname, 'src', 'client', 'index.html'),
      chunkSortMode : 'none'
    })

  ],


  // Webpack Development Server configuration
  devServer : {
    host               : 'localhost',
    port               : 3000,
    historyApiFallback : true,
    watchOptions       : {
      aggregateTimeout : 300,
      poll             : 1000
    }
  },


  // Including pollyfils and mocks for various node stuff.
  // Why? IDK. Nobody seems to know why.  :-)
  // TODO: Find out why.
  node : {
    global         : 'window',
    process        : true,
    crypto         : 'empty',
    module         : false,
    clearImmediate : false,
    setImmediate   : false
  }


};



module.exports = webpackConfig;