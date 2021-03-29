import webpack from 'webpack';
import path from 'path';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

export default ({ production }) => {
  const { NODE_ENV } = process.env;

  let plugins = [
    new webpack.DefinePlugin({
      '__DEV__': NODE_ENV === 'development',
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV || 'development')
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ];

  if (production) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    plugins = [
      ...plugins,
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.resolve(__dirname, 'report.html')
      })
    ]
  } else {
    plugins = [
      ...plugins,
      new FriendlyErrorsPlugin({
        clearConsole: false
      })
    ]
  }

  return plugins;
}
