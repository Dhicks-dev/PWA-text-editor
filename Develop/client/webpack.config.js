const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html', // Output HTML file
        chunks: ['main'] // Inject only 'main' bundle into this HTML file
      }),
      
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Create notes with or without an internet connection',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          }
        ]
      }),
      new InjectManifest({
        swSrc: './src/sw.js', // Path to service worker file
        swDest: 'service-worker.js', // Output file for the service worker
      })
    ],

    mmodule: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'] // Use style-loader and css-loader for handling CSS files
        },
        {
          test: /\m?.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/transform-runtime",
                ['@babel/preset-env', { targets: "defaults" }]

              ],
            }
          }
        }
      ],
    },
  };
};
