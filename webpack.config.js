const NODE_ENV = process.env.NODE_ENV || "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
global.style='sass'
// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join(...[__dirname].concat(args));
}


const config = {
  entry: {
    app: ["./src/init.ts"],
    polyfills: ['./src/polyfills.ts'],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "init.[name].min.js"
  },
  watch: NODE_ENV == 'dev',
  devtool: NODE_ENV == 'dev' ? 'source-map' : false,
  watchOptions: {
    aggregateTimeout: 100
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src', 'index.html')
    }),
    new Webpack.ContextReplacementPlugin( /(.+)?angular(\\|\/)core(.+)?/, root('./src'), {} ),
    new Webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {}
      }
    })

  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".styl", ".sass"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader?style=sass',
          '@angularclass/hmr-loader'
        ],
        //loader: "ts-loader"
      },

      {
        test: /\.styl$/,

        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "stylus-loader" }
        ]
      },

      {
        test: /\.styl$/,
        //exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({fallback:'style-loader', use: [
            { loader: "style-loader?sourceMap" },
            { loader: "css-loader" },
            { loader: "stylus-loader" }
          ] })
      },
      {test: /\.styl$/, exclude: root('src', 'style'), loader: 'raw-loader!postcss-loader!sass-loader'},
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader!postcss-loader'},

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.(scss|sass)$/, exclude: root('src', 'style'), loader: 'raw-loader!postcss-loader!sass-loader'},

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {test: /\.html$/, loader: 'raw-loader',  exclude: root('src', 'public')}
      // all css required in src/app files will be merged in js files



    ]
  },
  devServer : {
    contentBase: __dirname + '/src'
  },
};
if(NODE_ENV!='dev'){
  config.plugins.push(
    new UglifyJsPlugin()
  )
}


module.exports = config