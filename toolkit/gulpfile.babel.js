import gulp from 'gulp';
import notifier from 'node-notifier';
import { log, colors } from 'gulp-util';
import clean from './gulp/clean';
import sass from './gulp/sass';
import scssLint from './gulp/scss-lint';
import imagemin from './gulp/imagemin';
import copy from './gulp/copy';
import cleanCss from './gulp/clean-css';
import criticalCss from './gulp/critical-css';
import svgstore from './gulp/svgstore';
import template from './gulp/template';
import server from './gulp/server';
import watch from './gulp/watch';
import eslint from './gulp/eslint';
import compileHandlebars from './gulp/compile-handlebars'

const { NODE_ENV } = process.env;

// Main
let main = gulp.series(
  clean,
  scssLint,
  sass,
  svgstore,
  copy,
  compileHandlebars,
  template,
  server,
  cb => {
    log(colors.green.bold('FINISHED GULP DEV BUILD'));

    notifier.notify({
      title: 'Gulp',
      message: 'Development build complete, launching server...'
    });

    cb();
  },
  eslint,
  watch
);

if (NODE_ENV === 'production') {
  main = gulp.series(
    clean,
    scssLint,
    sass,
    svgstore,
    imagemin,
    compileHandlebars,
    gulp.parallel(copy, cleanCss),
    criticalCss,
    cb => {
      log(colors.green.bold('FINISHED GULP PRODUCTION BUILD'));

      notifier.notify({
        title: 'Gulp',
        message: 'Production build complete, compiling javascript...'
      });

      cb();
    }
  );
}

// Tasks
gulp.task('default', main);
