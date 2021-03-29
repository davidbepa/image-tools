import webpack from 'webpack';
import webpackConfigBabel from '../webpack.config.babel';
import webpackDevMiddleware from 'webpack-dev-middleware';
import url from 'url';
import proxy from 'proxy-middleware';
import browserSync from 'browser-sync';
import { log, colors } from 'gulp-util';
import config from '../config';

const { dir, server } = config;

function devserver(cb) {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Running dev server
--------------------------------------------------------------`)
  );

  const webpackConfig = webpackConfigBabel();
  const bundler = webpack(webpackConfig);
  const proxyUrl = server.proxy.url;
  const proxyRoute = server.proxy.route;

  //set up proxy
  let proxyOptions = null;

  if (proxyUrl !== '') {
    proxyOptions = url.parse(server.proxy.url);

    if (proxyRoute !== '') proxyOptions.route = server.proxy.route;
  }

  //set up middleware
  const middleware = [webpackDevMiddleware(bundler, webpackConfig.devServer)];

  if (proxyOptions !== null) {
    middleware.push(proxy(proxyOptions));
  }

  //browser configuration
  const browserConfig = {
    notify: false,
    logLevel: 'none',
    reloadDelay: 1000,
    server: {
      baseDir: `./${dir.development}`,
      middleware
    }
  };

  return browserSync.init(browserConfig, cb);
}

export default devserver;
