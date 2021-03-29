import config from './config';
import { entry, output, plugins, rules } from './webpack';

const { publicPath } = config.server;

module.exports = (env = {}) => {
  return {
    devtool: env.production ? 'source-map' : 'cheap-module-eval-source-map',
    entry,
    output: output(env),
    plugins: plugins(env),
    module: {
      rules: rules(env)
    },
    mode: env.production ? 'production' : 'development',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      extensions: ['.js', '.html']
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    devServer: {
      publicPath: `/${publicPath}/`,
      inline: false,
      stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }
    }
  }
};
