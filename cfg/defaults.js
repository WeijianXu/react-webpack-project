/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8000;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        enforce: 'pre',
        // loader: 'eslint-loader'
        use: ['eslint-loader']
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader'
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass/,
        // loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded',
            indentedSyntax: ''
          }
        }]
      },
      {
        test: /\.scss/,
        // loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            outputStyle: 'expanded'
          }
        }]
      },
      {
        test: /\.less/,
        // loader: 'style-loader!css-loader!less-loader'
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.styl/,
        // loader: 'style-loader!css-loader!stylus-loader'
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        // loader: 'url-loader?limit=8192'
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        // loader: 'file-loader'
        use: ['file-loader']
      }
    ]
  };
}
// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  additionalPaths: additionalPaths,
  loaderOptionsPlugin: {
    port: dfltPort,
    debug: true,
    // devtool: 'eval',
    options: {
      postcss: function () {
        return [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'ie >= 8']
          })
        ];
      }
    }
  }
};
